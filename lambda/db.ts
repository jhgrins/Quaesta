import "dotenv/config";

import AWS from "aws-sdk";

import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import {
    DeleteItemOutput,
    GetItemOutput,
    PutItemOutput,
    QueryOutput,
    UpdateItemOutput
} from "aws-sdk/clients/dynamodb";

import { User, Socket } from "../types";

export const BaseGameAPI = "https://api.igdb.com/v4";

type DynamoDBResult =
    | GetItemOutput
    | QueryOutput
    | PutItemOutput
    | UpdateItemOutput
    | DeleteItemOutput;

const createDocumentClient = (): AWS.DynamoDB.DocumentClient => {
    if (!process.env.AWS_REGION) throw new Error("AWS_REGION Is Not Defined");

    const serviceConfigOptions: ServiceConfigurationOptions = {
        region: process.env.AWS_REGION,
        ...(process.env.IS_OFFLINE && { endpoint: "http://localhost:8080" })
    };

    return new AWS.DynamoDB.DocumentClient(serviceConfigOptions);
};

export const getItem = async (table: string, id: string): Promise<GetItemOutput> => {
    const documentClient = createDocumentClient();
    try {
        console.log(`Getting item from table ${table} with id ${id}`);
        return await documentClient.get({ TableName: table, Key: { id } }).promise();
    } catch (err) {
        console.error(err);
        throw Error("DynamoDB Get Call Failed");
    }
};

export const getSocket = async (
    table: string,
    connectionId: string,
    operationId: string
): Promise<GetItemOutput> => {
    const documentClient = createDocumentClient();
    try {
        console.log(
            `Getting socket from table ${table} with connectionId ${connectionId} and operationId ${operationId}`
        );
        return await documentClient
            .get({ TableName: table, Key: { connectionId, operationId } })
            .promise();
    } catch (err) {
        console.error(err);
        throw Error("DynamoDB Get Call Failed");
    }
};

export const getItemsByIndex = async (
    table: string,
    key: string,
    value: string
): Promise<QueryOutput> => {
    const documentClient = createDocumentClient();
    try {
        console.log(`Getting item from table ${table} with ${key} ${value}`);
        return await documentClient
            .query({
                TableName: table,
                IndexName: key,
                KeyConditionExpression: "#indexKey = :value",
                ExpressionAttributeNames: { "#indexKey": key },
                ExpressionAttributeValues: { ":value": value }
            })
            .promise();
    } catch (err) {
        console.error(err);
        throw Error("DynamoDB Query Call Failed");
    }
};

export const putItem = async (table: string, item: Object): Promise<PutItemOutput> => {
    const documentClient = createDocumentClient();
    try {
        console.log(`Putting item into table ${table}`);
        return await documentClient
            .put({ TableName: table, Item: item, ReturnValues: "ALL_OLD" })
            .promise();
    } catch (err) {
        console.error(err);
        throw Error("DynamoDB Put Call Failed");
    }
};

export const updateItem = async (
    table: string,
    id: string,
    key: string,
    value: string
): Promise<UpdateItemOutput> => {
    const documentClient = createDocumentClient();
    try {
        console.log(`Updating item in table ${table} with id ${id}. New ${key} is ${value}`);
        return await documentClient
            .update({
                TableName: table,
                Key: { id },
                UpdateExpression: "set #updateKey = :value",
                ExpressionAttributeNames: { "#updateKey": key },
                ExpressionAttributeValues: { ":value": value },
                ReturnValues: "ALL_NEW"
            })
            .promise();
    } catch (err) {
        console.error(err);
        throw Error("DynamoDB Update Call Failed");
    }
};

export const deleteItem = async (table: string, id: string): Promise<DeleteItemOutput> => {
    const documentClient = createDocumentClient();
    try {
        console.log(`Deleting item from table ${table} with id ${id}`);
        return await documentClient
            .delete({ TableName: table, Key: { id }, ReturnValues: "ALL_OLD" })
            .promise();
    } catch (err) {
        console.error(err);
        throw Error("DynamoDB Delete Call Failed");
    }
};

export const getItemFromDynamoDBResult = (dynamodbResult: DynamoDBResult): User | Socket | null => {
    if ("Item" in dynamodbResult && dynamodbResult.Item) {
        return dynamodbResult.Item as unknown as User | Socket;
    }
    if ("Items" in dynamodbResult && dynamodbResult.Items) {
        return dynamodbResult.Items[0] as unknown as User | Socket;
    }
    if ("Attributes" in dynamodbResult && dynamodbResult.Attributes) {
        return dynamodbResult.Attributes as unknown as User | Socket;
    }
    return null;
};
