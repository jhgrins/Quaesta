import { SNSEvent, APIGatewayProxyResult } from "aws-lambda";
import { Socket } from "../../types";

import { getItemsByIndex } from "../db";
import { SubscriptionMessage } from "../sns";
import { sendMessageToSocket, HTTP_SUCCESS } from "./utils";

export const publish = async (event: SNSEvent): Promise<APIGatewayProxyResult> => {
	const { message, filters }: SubscriptionMessage = JSON.parse(event.Records[0].Sns.Message);

	console.log("Got subscription of type " + filters.subscription);
	const queryOutput = await getItemsByIndex("quaesta-sockets", "subscription", filters.subscription);
	if (queryOutput.Count === 0 || !queryOutput.Items) {
		console.log("No sockets subscribed to this subscription");
		return { statusCode: HTTP_SUCCESS, body: "" };
	}

	let sockets = queryOutput.Items as unknown as Socket[];
	if (filters.userId) {
		console.log(`Filtering sockets by userId ${filters.userId}`);
		sockets = sockets.filter((item) => item.userId === filters.userId);
	}

	for (const socket of sockets) {
		await sendMessageToSocket(socket.callbackUrlForAWS, socket.connectionId, {
			id: socket.operationId,
			payload: { data: { [socket.subscription]: message } },
			type: "next"
		});
	}
	return { statusCode: HTTP_SUCCESS, body: "" };
};

exports.handler = publish;
