import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

import AppleSignIn from "apple-signin-auth";

import { HTTP_REDIRECT, HTTP_SERVER_BAD_REQUEST } from "../subscription/utils";

import { getItemFromDynamoDBResult, getItemsByIndex } from "../db";
import { User } from "../../types";

import { generateToken } from "../resolvers/auth";
import createUser from "../resolvers/Mutation/createUser";

export const appleLogin = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
        return { statusCode: HTTP_SERVER_BAD_REQUEST, body: "" };
    }

    const requestBody = new URLSearchParams(event.body);
    if (!requestBody.has("id_token")) {
        return { statusCode: HTTP_SERVER_BAD_REQUEST, body: "" };
    }

    const { email } = await AppleSignIn.verifyIdToken(requestBody.get("credential") as string, {
        audience: "com.quaesta.signin",
        ignoreExpiration: true
    });
    console.log(`Received Google login request for user with email ${email}`);

    const baseUrl = process.env.IS_OFFLINE ? "http://localhost:3000" : "https://quaesta.dev";

    const queryOutput = await getItemsByIndex("quaesta-users", "email", email);
    if (queryOutput.Count && queryOutput.Count > 0) {
        const userRecord = getItemFromDynamoDBResult(queryOutput) as User;
        const redirectPath = userRecord.username ? "app" : "finalize-account";
        console.log(`User already exists, redirecting to /${redirectPath}`);
        return {
            statusCode: HTTP_REDIRECT,
            headers: {
                Location: `${baseUrl}/${redirectPath}?token=${generateToken(userRecord.id)}`
            },
            body: ""
        };
    }

    const token = await createUser(null, { email }, { userId: null }, null);
    return {
        statusCode: HTTP_REDIRECT,
        headers: {
            Location: `${baseUrl}/finalize-account?token=${token}`
        },
        body: ""
    };
};

exports.handler = appleLogin;
