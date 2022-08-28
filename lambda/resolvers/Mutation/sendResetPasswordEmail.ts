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

export default sendResetPasswordEmail;
