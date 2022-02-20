import { promises as fs } from "fs";

import NodeMailer from "nodemailer";
import handlebars from "handlebars";

import { generateToken } from "../auth";
import { getItemFromDynamoDBResult, getItemsByIndex } from "../db";
import { Context } from "../index";

interface Args {
	email: string;
}

const sendResetPasswordEmail = async (_: any, args: Args, context: Context, info: any) => {
	validateEnvironmentVariables();
	const queryOutput = await getItemsByIndex("quaesta-users", "email", args.email);
	const userRecord = getItemFromDynamoDBResult(queryOutput);
	if (!userRecord) return false;
	let mailTransporter = NodeMailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD
		}
	});

	const filePath = process.env.IS_OFFLINE
		? "../frontend/static/email/forgotEmail.html"
		: "/website/email/forgotEmail.html";
	const file = await fs.readFile(__dirname + filePath);
	const template = handlebars.compile(file.toString());

	const replacements = {
		username: userRecord.username,
		resetLink: process.env.IS_OFFLINE
			? "http://localhost:3000"
			: "https://quaesta.dev" + "/forgot-password/?id=" + generateToken(userRecord.id)
	};
	const mailDetails = {
		from: process.env.MAIL_USERMAME,
		to: userRecord.email,
		subject: "Hypergate Password Reset",
		html: template(replacements)
	};
	mailTransporter.sendMail(mailDetails);
	return true;
};

const validateEnvironmentVariables = () => {
	if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
		throw Error("Must Define MAIL_USERNAME and MAIL_PASSWORD");
	}
};

export default sendResetPasswordEmail;
