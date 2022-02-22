import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { parse, getOperationAST, buildSchema, specifiedRules, validate } from "graphql";

import { HTTP_SERVER_BAD_REQUEST, HTTP_SERVER_ERROR, HTTP_SUCCESS } from "../constants";
import { getItem, updateItem, deleteItem, getItemFromDynamoDBResult, putItem } from "../db";
import { authenticateHTTPAccessToken } from "../graphql/auth";
import { gqlSchema } from "../graphql/schema";
import { sendMessageToSocket } from "./utils";

export const subscribe = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	if (!event.body) {
		return { statusCode: HTTP_SUCCESS, body: "" };
	}

	const { connectionId, domainName, stage } = event.requestContext;
	const callbackUrlForAWS = `http://${domainName}/${stage}`;
	if (!connectionId) {
		return { statusCode: HTTP_SERVER_ERROR, body: "" };
	}

	const { type } = JSON.parse(event.body);
	switch (type) {
		case "connection_init":
			await sendMessageToSocket(callbackUrlForAWS, connectionId, { type: "connection_ack" });
			break;
		case "ping":
			await sendMessageToSocket(callbackUrlForAWS, connectionId, { type: "pong" });
			break;
		case "subscribe":
			await subscribeProtocol(callbackUrlForAWS, event);
			break;
		case "complete":
			await deleteItem("quaesta-sockets", connectionId);
			break;
	}
	return { statusCode: HTTP_SUCCESS, body: "" };
};

const subscribeProtocol = async (
	callbackUrlForAWS: string,
	event: APIGatewayEvent
): Promise<APIGatewayProxyResult | void> => {
	const { connectionId } = event.requestContext;
	const { id, payload } = JSON.parse(event.body as string);
	await putItem("quaesta-sockets", {
		connectionId,
		operationId: id,
		subscription: "newFriendRequest",
		ttl: Math.floor(Date.now() / 1000) + 60 * 60 * 2
	});

	try {
		validateGraphQL(callbackUrlForAWS, connectionId as string, id, payload);
	} catch (err) {
		return { statusCode: HTTP_SERVER_BAD_REQUEST, body: "" };
	}
};

const validateGraphQL = async (
	callbackUrlForAWS: string,
	connectionId: string,
	operationId: string,
	payload: any
): Promise<void> => {
	const { query, operationName } = payload;
	const document = parse(query);
	const operationAST = getOperationAST(document, operationName || "");
	if (!operationAST || operationAST.operation !== "subscription") {
		await sendMessageToSocket(callbackUrlForAWS, connectionId, {
			id: operationId,
			payload: { message: "Only Subscriptions are Supported" },
			type: "error"
		});
		throw new Error("Only Subscriptions are Supported");
	}
	const validationErrors = validate(gqlSchema, document, specifiedRules);
	if (validationErrors.length > 0) {
		await sendMessageToSocket(callbackUrlForAWS, connectionId, {
			id: operationId,
			payload: { errors: validationErrors },
			type: "error"
		});
		throw new Error("Invalid GraphQL");
	}
};

exports.subscribe = subscribe;
