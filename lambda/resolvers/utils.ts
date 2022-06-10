import "dotenv/config";

import { AuthenticationError, UserInputError } from "apollo-server-errors";

import axios from "axios";

import { Context } from "./index";
import { BaseGameAPI, getItem, getItemFromDynamoDBResult } from "../db";
import { User } from "../../types";
import apicalypse, { ApicalypseConfig } from "apicalypse";

interface Parent {
    id: string;
    friends?: string[];
}

export const checkIsLoggedIn = async (context: Context): Promise<void> => {
    if (!context.userId) {
        throw new AuthenticationError("Must Be Logged In");
    }
    const queryOutput = await getItem("quaesta-users", context.userId);
    const userRecord = getItemFromDynamoDBResult(queryOutput);
    if (!userRecord) {
        throw new AuthenticationError("User Does Not Exist");
    }
};

export const checkIsMe = async (parent: Parent, context: Context): Promise<void> => {
    if (!context.userId || parent.id.toString() !== context.userId) {
        throw new AuthenticationError("Permissions Invalid For Requested Field");
    }
};

export const checkInMyFriends = async (context: Context, friendUsername: string): Promise<void> => {
    const queryOutput = await getItem("quaesta-users", context.userId as string);
    const userRecord = getItemFromDynamoDBResult(queryOutput) as User | null;
    if (
        !userRecord ||
        (userRecord.username !== friendUsername && !userRecord.friends.includes(friendUsername))
    ) {
        throw new UserInputError("Not Friends With Provided User");
    }
};

export const getTwitchAccessToken = async (): Promise<string> => {
    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;
    if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
        throw Error("Must Define TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET");
    }
    const baseTwitchAuthAPI = "https://id.twitch.tv/oauth2/token";
    const response = await axios.post(
        `${baseTwitchAuthAPI}?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
    );
    return response.data.access_token;
};

export const createIGDBRequestConfig = (twitchToken: string): ApicalypseConfig => {
    return {
        method: "post",
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${twitchToken}`
        },
        baseURL: BaseGameAPI
    };
};

export const makeIGDBRequestForRouteByIds = async (
    twitchToken: string,
    route: string,
    ids: string[]
): Promise<any[]> => {
    const config = createIGDBRequestConfig(twitchToken);
    const response = await apicalypse(config)
        .fields("*")
        .where(ids.map((id) => `id = ${id}`).join(" | "))
        .request(`/${route}`);
    return response.data;
};
