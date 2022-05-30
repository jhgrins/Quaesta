import "dotenv/config";

import { ApolloServer } from "apollo-server-lambda";

import { makeExecutableSchema } from "@graphql-tools/schema";

import { authenticateHTTPAccessToken } from "./auth";
import mocks from "./mocking";
import { typeDefs, resolvers } from "./schema";
import { getTwitchAccessToken } from "./utils";

export interface Context {
    userId: string | null;
    twitchToken: string | null;
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
    context: async ({ express }): Promise<Context> => ({
        userId: authenticateHTTPAccessToken(express.req),
        twitchToken: await getTwitchAccessToken()
    })
});

exports.handler = server.createHandler({
    expressGetMiddlewareOptions: {
        cors: {
            origin: true,
            credentials: true
        }
    }
});
