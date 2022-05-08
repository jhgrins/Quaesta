import { UserInputError } from "apollo-server-errors";

import CryptoJS from "crypto-js";
import { v4 as uuid } from "uuid";

import { promises as fs } from "fs";

import { generateToken } from "../auth";
import { getItemsByIndex, putItem } from "../../db";
import { Context } from "../index";

interface Args {
	email: string;
	username: string;
	password: string;
}

const createUser = async (_: any, args: Args, context: Context, info: any): Promise<string> => {
	console.log(process.env);
	validateEnvironmentVariables();
	await validateEmail(args.email);
	if (args.username) await validateUsername(args.username);
	if (args.password) {
		args.password = CryptoJS.AES.encrypt(
			args.password,
			(process.env.PASSWORD_KEY as string) || "PASSWORD"
		).toString();
	}

	const randomUserId = uuid();
	await putItem("quaesta-users", { id: randomUserId, ...args });

	sendAccountCreatedEmail(args.email);
	return generateToken(randomUserId);
};

const validateEnvironmentVariables = () => {
	if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
		throw Error("Must Define MAIL_USERNAME and MAIL_PASSWORD");
	}
};

const validateEmail = async (email: string) => {
	const queryOutput = await getItemsByIndex("quaesta-users", "email", email);
	if (queryOutput.Count && queryOutput.Count > 0) {
		throw new UserInputError("User Already Exists");
	}
};

const validateUsername = async (username: string) => {
	if (username.length > 12) {
		throw new UserInputError("Username Longer Than 12 Characters");
	}
	const queryOutput = await getItemsByIndex("quaesta-users", "username", username);
	if (queryOutput.Count && queryOutput.Count > 0) {
		throw new UserInputError("User Already Exists");
	}
};

const sendAccountCreatedEmail = async (email: string) => {
	console.log(`Sending Account Created Email to ${email}`);
	
};

export default createUser;
