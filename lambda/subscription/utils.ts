import AWS from "aws-sdk";
import { ExecutionResult, GraphQLError } from "graphql";

export const sendMessageToSocket = async (
	endpoint: string,
	connectionId: string,
	payload: Record<string, unknown> | ExecutionResult | GraphQLError[]
) => {
	const apiGateway = new AWS.ApiGatewayManagementApi({
		endpoint: process.env.IS_OFFLINE ? "http://localhost:8001" : endpoint
	});
	await apiGateway
		.postToConnection({
			ConnectionId: connectionId,
			Data: JSON.stringify(payload)
		})
		.promise();
};
