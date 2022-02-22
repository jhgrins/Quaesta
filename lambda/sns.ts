import "dotenv/config";

import AWS from "aws-sdk";

import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import { PromiseResult } from "aws-sdk/lib/request";

if (!process.env.AWS_REGION) throw new Error("AWS_REGION Is Not Defined");

const snsServiceConfigOptions: ServiceConfigurationOptions = {
	region: process.env.AWS_REGION,
	endpoint: process.env.SNS_ENDPOINT || "http://127.0.0.1:4002"
};

const sns = new AWS.SNS(snsServiceConfigOptions);

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
): Promise<PromiseResult<AWS.SNS.PublishResponse, AWS.AWSError>> => {
	const subscriptionMessage: SubscriptionMessage = { message, filters };
	return await sns
		.publish({
			Message: JSON.stringify(subscriptionMessage),
			TopicArn: `arn:aws:sns:${process.env.AWS_REGION}:123456789012:subscription`
		})
		.promise();
};

export default sns;
