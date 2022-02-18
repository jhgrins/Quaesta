import fs from "fs";
import path from "path";

import { gql } from "apollo-server-express";

const schema: any = [fs.readFileSync(path.join(__dirname, "../schema.graphql"), "utf8")];
const typeDefs: any = gql(schema);

import selfLookup from "./Query/selfLookup";
import gameLookup from "./Query/gameLookup";

import createUser from "./Mutation/createUser";
import deleteUser from "./Mutation/deleteUser";
import editUser from "./Mutation/editUser";
import loginUser from "./Mutation/loginUser";
import sendResetPasswordEmail from "./Mutation/sendResetPasswordEmail";

import newFriendRequest from "./Subscription/newFriendRequest";

import email from "./User/email";
import friends from "./User/friends";
import password from "./User/password";

import cover from "./Game/cover";
import genres from "./Game/genres";
import companies from "./Game/companies";

const resolvers = {
	Query: { selfLookup, gameLookup },
	Mutation: {
		createUser,
		deleteUser,
		editUser,
		loginUser,
		sendResetPasswordEmail
	},
	Subscription: { newFriendRequest },
	User: { email, friends, password },
	Game: { cover, genres, companies }
};

export { typeDefs, resolvers };
