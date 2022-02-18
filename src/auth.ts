import "dotenv/config";

import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";

import User from "./User/type";

export const generateToken = (id: string): string => {
	if (!process.env.AUTH_KEY) {
		throw Error("AUTH_KEY Is Not Defined");
	}
	return jwt.sign({ id }, process.env.AUTH_KEY);
};

export const decryptToken = (token: string): User => {
	if (!process.env.AUTH_KEY) {
		throw Error("AUTH_KEY Is Not Defined");
	}
	return jwt.verify(token, process.env.AUTH_KEY) as User;
};

export const authenticateHTTPAccessToken = (req: any): string | null => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return null;

	const token = authHeader.split(" ")[1];
	if (!token) throw new AuthenticationError("Authentication Token Not Specified");

	try {
		return decryptToken(token).id;
	} catch (err) {
		throw new AuthenticationError("Invalid Authentication Token");
	}
};
