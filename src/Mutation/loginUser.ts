import { UserInputError } from "apollo-server-express";

import CryptoJS from "crypto-js";

import { generateToken } from "../auth";
import { getItemsByIndex, getItemFromDynamoDBResult } from "../db";
import { Context } from "../index";

interface Args {
	type: "email" | "username";
	value: string;
	password: string;
}

const loginUser = async (_: any, args: Args, context: Context, info: any): Promise<string> => {
	validateEnvironmentVariables();
	const queryOutput = await getItemsByIndex("quaesta-users", args.type, args.value);
	if (queryOutput.Count && queryOutput.Count === 0) {
		throw new UserInputError("User Not Found");
	}
	const userRecord = getItemFromDynamoDBResult(queryOutput);
	const bytes = CryptoJS.AES.decrypt(
		userRecord.password as string,
		process.env.PASSWORD_KEY as string
	);
	const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
	if (decryptedPassword !== args.password) {
		throw new UserInputError("Incorrect Username or Password");
	}
	return generateToken(userRecord.id.toString());
};

const validateEnvironmentVariables = () => {
	if (!process.env.PASSWORD_KEY) {
		throw Error("PASSWORD_KEY Is Not Defined");
	}
};

export default loginUser;
