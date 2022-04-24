import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import {
	parse,
	getOperationAST,
	specifiedRules,
	validate,
	OperationDefinitionNode,
	FieldNode,
	DocumentNode
} from "graphql";

import { deleteItem, getItemFromDynamoDBResult, putItem, getSocket } from "../db";
import {
	deleteSocketConnection,
	sendMessageToSocket,
	HTTP_SERVER_BAD_REQUEST,
	HTTP_SERVER_ERROR,
	HTTP_SUCCESS
} from "./utils";

import { authenticateHTTPAccessToken } from "../resolvers/auth";
import { gqlSchema } from "../resolvers/schema";

interface SubscriptionEventBody {
	id: string;
	type: string;
	payload: {
		query: string;
		operationName: string;
	};
}

export const subscribe = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	if (!event.body) {
		return { statusCode: HTTP_SUCCESS, body: "" };
	}

	const { connectionId, domainName, stage } = event.requestContext;
	const callbackUrlForAWS = `http://${domainName}/${stage}`;
	if (!connectionId) {
		console.log("No connectionId in requestBody");
		return { statusCode: HTTP_SERVER_ERROR, body: "" };
	}

	const body: SubscriptionEventBody = JSON.parse(event.body);
	console.log("Got message of type " + body.type);
	switch (body.type) {
		case "connection_init":
			await sendMessageToSocket(callbackUrlForAWS, connectionId, { type: "connection_ack" });
			break;
		case "ping":
			await sendMessageToSocket(callbackUrlForAWS, connectionId, { type: "pong" });
			break;
		case "subscribe":
			await subscribeProtocol(callbackUrlForAWS, connectionId, body, event);
			break;
		case "complete":
			await deleteItem("quaesta-sockets", connectionId);
			break;
		default:
			console.error("Unknown subscription protocol message type");
			return { statusCode: HTTP_SERVER_ERROR, body: "" };
	}
	return { statusCode: HTTP_SUCCESS, body: "" };
};

const subscribeProtocol = async (
	callbackUrlForAWS: string,
	connectionId: string,
	body: SubscriptionEventBody,
	event: APIGatewayEvent
): Promise<APIGatewayProxyResult | void> => {
	const { id, payload } = body;
	const queryOutput = await getSocket("quaesta-sockets", connectionId, id);
	const socketRecord = getItemFromDynamoDBResult(queryOutput);
	if (socketRecord) {
		console.log("Socket already exists, can't re-subscribe");
		deleteSocketConnection(callbackUrlForAWS, connectionId);
		return { statusCode: HTTP_SERVER_BAD_REQUEST, body: "" };
	}

	const parsedQuery = parse(payload.query);
	const definition = parsedQuery.definitions[0] as OperationDefinitionNode;
	const selection = definition.selectionSet.selections[0] as FieldNode;
	const name = selection.name.value;

	try {
		await validateGraphQL(
			callbackUrlForAWS,
			connectionId,
			id,
			parsedQuery,
			payload.operationName
		);
		const token = authenticateHTTPAccessToken(event);
		await putItem("quaesta-sockets", {
			callbackUrlForAWS,
			connectionId,
			operationId: id,
			subscription: name,
			...(token && { userId: token }),
			ttl: Math.floor(Date.now() / 1000) + 60 * 60 * 2
		});
	} catch (err) {
		return { statusCode: HTTP_SERVER_BAD_REQUEST, body: err as string };
	}
};

const validateGraphQL = async (
	callbackUrlForAWS: string,
	connectionId: string,
	operationId: string,
	parsedQuery: DocumentNode,
	operationName: string
): Promise<void> => {
	const operationAST = getOperationAST(parsedQuery, operationName || "");
	if (!operationAST || operationAST.operation !== "subscription") {
		await sendMessageToSocket(callbackUrlForAWS, connectionId, {
			id: operationId,
			payload: { message: "Only Subscriptions are Supported" },
			type: "error"
		});
		throw new Error("Only Subscriptions are Supported");
	}
	const validationErrors = validate(gqlSchema, parsedQuery, specifiedRules);
	if (validationErrors.length > 0) {
		await sendMessageToSocket(callbackUrlForAWS, connectionId, {
			id: operationId,
			payload: validationErrors,
			type: "error"
		});
		throw new Error("GraphQL Validation Error");
	}
};

exports.handler = subscribe;
