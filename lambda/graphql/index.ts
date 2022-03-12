import "dotenv/config";

import { ApolloServer } from "apollo-server-lambda";

import { makeExecutableSchema } from "@graphql-tools/schema";

import { authenticateHTTPAccessToken } from "./auth";
import mocks from "./mocking";
import { typeDefs, resolvers } from "./schema";

export interface Context {
	userId: string | null;
}

const server = new ApolloServer({
	schema: makeExecutableSchema({ typeDefs, resolvers }),
	mocks: process.env.MOCK ? mocks : undefined,
	formatError: (err) => {
		if (!err.extensions) {
			throw Error("Extensions Object Does Not Exist On Error");
		}
		if (err.extensions.code === "INTERNAL_SERVER_ERROR") {
			if (err.extensions) console.error(`${err.extensions.code}: ${err.message}`);
			else console.error(err);
		}
		if (process.env.IS_OFFLINE) {
			console.log(err);
		}
		return err;
	},
	context: ({ express }): Context => ({
		userId: authenticateHTTPAccessToken(express.req)
	})
});

exports.graphql = server.createHandler({
	expressGetMiddlewareOptions: {
		cors: {
			origin: true,
			credentials: true
		}
	}
});
