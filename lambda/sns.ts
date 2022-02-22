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

export const publish = async (
	topicName: string,
	subscription: string,
	message: any
): Promise<PromiseResult<AWS.SNS.PublishResponse, AWS.AWSError>> => {
	return await sns
		.publish({
			Message: JSON.stringify({ subscription, message }),
			TopicArn: "arn:aws:sns:us-west-2:123456789012:" + topicName
		})
		.promise();
};

export default sns;
