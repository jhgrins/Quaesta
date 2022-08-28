import * as fs from "fs";
import * as path from "path";

import { gql } from "apollo-server-express";

import { buildSchema } from "graphql";

console.log(fs);
const schema = fs.readFileSync(path.join(__dirname, "../../schema.graphql"), "utf8");
export const typeDefs = gql(schema);
export const gqlSchema = buildSchema(schema);

import selfLookup from "./Query/selfLookup";
import gameLookup from "./Query/gameLookup";
import gameSearch from "./Query/gameSearch";

import createUser from "./Mutation/createUser";
import deleteUser from "./Mutation/deleteUser";
import editUser from "./Mutation/editUser";
import loginUser from "./Mutation/loginUser";
import sendResetPasswordEmail from "./Mutation/sendResetPasswordEmail";
import testMutation from "./Mutation/testMutation";

import email from "./User/email";
import friends from "./User/friends";
import password from "./User/password";

import ageRatings from "./Game/ageRatings";
import artworks from "./Game/artworks";
import companies from "./Game/companies";
import coverUrl from "./Game/coverUrl";
import dlcs from "./Game/dlcs";
import franchises from "./Game/franchises";
import gameEngines from "./Game/gameEngines";
import genres from "./Game/genres";
import platforms from "./Game/platforms";
import ratingCount from "./Game/ratingCount";
import videos from "./Game/videos";

export const resolvers = {
    Query: { selfLookup, gameLookup, gameSearch },
    Mutation: {
        createUser,
        deleteUser,
        editUser,
        loginUser,
        sendResetPasswordEmail,
        testMutation
    },
    User: { email, friends, password },
    Game: {
        ageRatings,
        artworks,
        companies,
        coverUrl,
        dlcs,
        franchises,
        gameEngines,
        genres,
        platforms,
        ratingCount,
        videos
    }
};
