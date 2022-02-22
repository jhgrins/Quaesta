import { UserInputError } from "apollo-server-express";

import CryptoJS from "crypto-js";

import { generateToken } from "../auth";
import { getItemsByIndex, getItemFromDynamoDBResult } from "../../db";
import { Context } from "../index";
import { User } from "../../../types";

interface Args {
	type: "email" | "username";
	value: string;
	password: string;
}

const loginUser = async (_: any, args: Args, context: Context, info: any): Promise<string> => {
	const queryOutput = await getItemsByIndex("users", args.type, args.value);
	const userRecord = getItemFromDynamoDBResult(queryOutput) as User | null;
	if (!userRecord) {
		throw new UserInputError("User Not Found");
	}
	const bytes = CryptoJS.AES.decrypt(
		userRecord.password as string,
		(process.env.PASSWORD_KEY as string) || "PASSWORD"
	);
	const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
	if (decryptedPassword !== args.password) {
		throw new UserInputError("Incorrect Username or Password");
	}
	return generateToken(userRecord.id.toString());
};

export default loginUser;
