import AWS, { ApiGatewayManagementApi } from "aws-sdk";
import { ExecutionResult, GraphQLError } from "graphql";

export const sendMessageToSocket = async (
    endpoint: string,
    connectionId: string,
    payload: Record<string, unknown> | ExecutionResult | GraphQLError[]
) => {
    console.log(`Sending message to connectionId ${connectionId}`);
    const apiGateway = new ApiGatewayManagementApi({
        endpoint: process.env.IS_OFFLINE ? "http://localhost:8001" : endpoint
    });
    await apiGateway
        .postToConnection({ ConnectionId: connectionId, Data: JSON.stringify(payload) })
        .promise();
};

export const deleteSocketConnection = async (endpoint: string, connectionId: string) => {
    console.log(`Deleting socket with connectionId ${connectionId}`);
    const apiGateway = new ApiGatewayManagementApi({
        endpoint: process.env.IS_OFFLINE ? "http://localhost:8001" : endpoint
    });
    await apiGateway.deleteConnection({ ConnectionId: connectionId }).promise();
};

export const HTTP_SUCCESS = 200;
export const HTTP_SERVER_BAD_REQUEST = 400;
export const HTTP_SERVER_ERROR = 500;
