import { promises as fs } from "fs";

import { generateToken } from "../auth";
import { getItemFromDynamoDBResult, getItemsByIndex } from "../../db";
import { Context } from "../index";
import { User } from "../../../types";

interface Args {
	email: string;
}

const sendResetPasswordEmail = async (_: any, args: Args, context: Context, info: any) => {
	validateEnvironmentVariables();
	const queryOutput = await getItemsByIndex("quaesta-users", "email", args.email);
	const userRecord = getItemFromDynamoDBResult(queryOutput) as User | null;
	if (!userRecord) return false;
	sendEmail(args.email);
	return true;
};

const validateEnvironmentVariables = () => {
	if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
		throw Error("Must Define MAIL_USERNAME and MAIL_PASSWORD");
	}
};

const sendEmail = async (email: string) => {
    console.log(`Sending Account Created Email to ${email}`);
};

export default sendResetPasswordEmail;
