import { UserInputError } from "apollo-server-errors";

import CryptoJS from "crypto-js";
import { v4 as uuid } from "uuid";

import { promises as fs } from "fs";
import NodeMailer from "nodemailer";

import { generateToken } from "../auth";
import { getItemsByIndex, putItem } from "../../db";
import { Context } from "../index";

interface Args {
	email: string;
	username: string;
	password: string;
}

const createUser = async (_: any, args: Args, context: Context, info: any): Promise<string> => {
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

	//sendAccountCreatedEmail(args.email);
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
	const mailTransporter: any = NodeMailer.createTransport({
		service: "gmail",
		auth: { user: process.env.MAIL_USERNAME, pass: process.env.MAIL_PASSWORD }
	});
	const filePath =
		__dirname +
		(process.env.IS_OFFLINE
			? "/../../../frontend/static/email/accountCreated.html"
			: "/website/email/accountCreated.html");
	const file = await fs.readFile(filePath);
	const mailDetails = {
		from: process.env.MAIL_USERMAME,
		to: email,
		subject: "Quaesta Account Created",
		html: file
	};
	mailTransporter.sendMail(mailDetails);
};

export default createUser;
