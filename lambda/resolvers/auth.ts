import "dotenv/config";

import { AuthenticationError, ExpressContext } from "apollo-server-express";
import { APIGatewayEvent } from "aws-lambda";

import jwt from "jsonwebtoken";

import { User } from "../../types";

export const generateToken = (id: string): string => {
	console.log(`Generating token for user with id ${id}`);
	return jwt.sign({ id }, process.env.AUTH_KEY || "AUTH");
};

export const decryptToken = (token: string): User => {
	console.log(`Decrypting token for user with token ${token}`);
	return jwt.verify(token, process.env.AUTH_KEY || "AUTH") as User;
};

export const authenticateHTTPAccessToken = (
	req: ExpressContext["req"] | APIGatewayEvent
): string | null => {
	const authHeader = req.headers?.authorization;
	if (!authHeader) return null;

	const token = authHeader.split(" ")[1];
	if (!token) throw new AuthenticationError("Authentication Token Not Specified");

	try {
		return decryptToken(token).id;
	} catch (err) {
		throw new AuthenticationError("Invalid Authentication Token");
	}
};
