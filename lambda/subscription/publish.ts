import { SNSEvent, APIGatewayProxyResult } from "aws-lambda";
import { User, Socket } from "../../types";

import { HTTP_SUCCESS } from "../constants";
import { getItemFromDynamoDBResult, getItemsByIndex } from "../db";
import { sendMessageToSocket } from "./utils";

const publish = async (event: SNSEvent): Promise<APIGatewayProxyResult> => {
	const { subscription, message } = JSON.parse(event.Records[0].Sns.Message);

	const queryOutput = await getItemsByIndex("quaesta-sockets", "subscription", subscription);
	const socketRecord = getItemFromDynamoDBResult(queryOutput) as Socket;
	if (!socketRecord) {
		console.error("Socket Not Found");
	}

	await sendMessageToSocket("", socketRecord.connectionId, {
		id: socketRecord.operationId,
		payload: {
			data: {
				[subscription]: message
			}
		},
		type: "next"
	});
	return { statusCode: HTTP_SUCCESS, body: "" };
};

module.exports.publish = publish;
