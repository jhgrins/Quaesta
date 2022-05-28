import { UserInputError } from "apollo-server-lambda";

import { getItemFromDynamoDBResult, getItemsByIndex } from "../../db";
import { Context } from "../index";
import { User } from "../../../types";
import { sendForgotPasswordEmail } from "../../ses";
import { generateToken } from "../auth";

interface Args {
    userPair: {
        key: string;
        value: string;
    };
}

const sendResetPasswordEmail = async (_: any, args: Args, context: Context, info: any) => {
    validateEnvironmentVariables();

    const { key, value } = args.userPair;
    const queryOutput = await getItemsByIndex("quaesta-users", key, value);
    const userRecord = getItemFromDynamoDBResult(queryOutput) as User | null;
    if (!userRecord) {
        throw new UserInputError("User Not Found");
    }

    console.log(`Sending Forgot Password Email to ${userRecord.email}`);
    sendForgotPasswordEmail(
        userRecord.email,
        userRecord.username,
        `https://quaesta.dev/forgot-password/?id=${generateToken(userRecord.id)}`
    );
    return true;
};

const validateEnvironmentVariables = () => {
    if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
        throw Error("Must Define MAIL_USERNAME and MAIL_PASSWORD");
    }
};

export default sendResetPasswordEmail;
