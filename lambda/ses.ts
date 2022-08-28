import "dotenv/config";

import AWS, { AWSError } from "aws-sdk";

import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import { PromiseResult } from "aws-sdk/lib/request";
import { SendTemplatedEmailResponse } from "aws-sdk/clients/ses";

const createSESClient = () => {
    if (!process.env.AWS_REGION) throw new Error("AWS_REGION Is Not Defined");

    const sesServiceConfigOptions: ServiceConfigurationOptions = {
        region: process.env.AWS_REGION,
        ...(process.env.IS_OFFLINE && { endpoint: "http://localhost:9001" })
    };

    return new AWS.SES(sesServiceConfigOptions);
};

export const sendAccountCreatedEmail = async (
    email: any,
    username: string
): Promise<PromiseResult<SendTemplatedEmailResponse, AWSError>> => {
    const sesClient = createSESClient();
    return await sesClient
        .sendEmail({
            Destination: { ToAddresses: [email] },
            Source: "team@quaesta.dev",
            ReplyToAddresses: ["me@maxrosoff.com"],
            Message: {
                Body: {
                    Html: {
                        Data: `Welcome to Quaesta, ${username}!`
                    },
                    Text: {
                        Data: `Welcome to Quaesta, ${username}!`
                    }
                },
                Subject: {
                    Data: "Quaesta Account Successfully Created"
                }
            }
        })
        .promise();
};

export const sendForgotPasswordEmail = async (
    email: any,
    username: string | undefined,
    resetLink: string
): Promise<PromiseResult<SendTemplatedEmailResponse, AWSError>> => {
    const sesClient = createSESClient();
    return await sesClient
        .sendEmail({
            Destination: { ToAddresses: [email] },
            Source: "team.quaesta.dev",
            ReplyToAddresses: ["me@maxrosoff.com"],
            Message: {
                Body: {
                    Html: {
                        Data: `Sorry you forgot your password, ${username}! Click here to reset it: ${resetLink}`
                    },
                    Text: {
                        Data: `Sorry you forgot your password, ${username}! Click here to reset it: ${resetLink}`
                    }
                },
                Subject: {
                    Data: "Quaesta Account Password Reset Request"
                }
            }
        })
        .promise();
};
