import "dotenv/config";

import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { User } from "../../types";

export const generateToken = (id: string): string => {
	return jwt.sign({ id }, process.env.AUTH_KEY || "AUTH");
};

export const decryptToken = (token: string): User => {
	return jwt.verify(token, process.env.AUTH_KEY || "AUTH") as User;
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
