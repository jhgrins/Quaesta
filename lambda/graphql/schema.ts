import fs from "fs";
import path from "path";

import { gql } from "apollo-server-express";

import { buildSchema } from "graphql";

const schema = fs.readFileSync(path.join(__dirname, "../../schema.graphql"), "utf8");
export const typeDefs = gql(schema);
export const gqlSchema = buildSchema(schema);

import selfLookup from "./Query/selfLookup";
import gameLookup from "./Query/gameLookup";

import createUser from "./Mutation/createUser";
import deleteUser from "./Mutation/deleteUser";
import editUser from "./Mutation/editUser";
import loginUser from "./Mutation/loginUser";
import sendResetPasswordEmail from "./Mutation/sendResetPasswordEmail";
import testMutation from "./Mutation/testMutation";

import email from "./User/email";
import friends from "./User/friends";
import password from "./User/password";

import cover from "./Game/cover";
import genres from "./Game/genres";
import companies from "./Game/companies";

export const resolvers = {
	Query: { selfLookup, gameLookup },
	Mutation: {
		createUser,
		deleteUser,
		editUser,
		loginUser,
		sendResetPasswordEmail,
		testMutation
	},
	User: { email, friends, password },
	Game: { cover, genres, companies }
};
