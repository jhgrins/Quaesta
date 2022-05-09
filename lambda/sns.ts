import "dotenv/config";

import AWS, { AWSError } from "aws-sdk";

import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import { PromiseResult } from "aws-sdk/lib/request";
import { PublishResponse } from "aws-sdk/clients/sns";

const createSNSClient = () => {
    if (!process.env.AWS_REGION) throw new Error("AWS_REGION Is Not Defined");

    const snsServiceConfigOptions: ServiceConfigurationOptions = {
        region: process.env.AWS_REGION,
        ...(process.env.IS_OFFLINE && { endpoint: "http://127.0.0.1:4002" })
    };

    return new AWS.SNS(snsServiceConfigOptions);
};

export interface SubscriptionMessage {
    message: any;
    filters: {
        subscription: string;
        userId?: string;
    };
}

export const publishToSubscribers = async (
    message: any,
    filters: { subscription: string; userId?: string }
): Promise<PromiseResult<PublishResponse, AWSError>> => {
    const snsClient = createSNSClient();
    const subscriptionMessage: SubscriptionMessage = { message, filters };
    return await snsClient
        .publish({
            Message: JSON.stringify(subscriptionMessage),
            TopicArn: `arn:aws:sns:${process.env.AWS_REGION}:123456789012:subscription`
        })
        .promise();
};
