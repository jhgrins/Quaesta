import apicalypse from "apicalypse";

import { BaseGameAPI } from "../../db";
import { Context } from "../index";
import { callTwitch } from "../utils";

interface Args {
	name: string;
}

const gameLookup = async (_: any, args: Args, context: Context, info: any) => {
	const accessToken = (await callTwitch()).access_token;
	const config = {
		method: "post",
		headers: {
			"Client-ID": process.env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: BaseGameAPI
	};

	const response = await apicalypse(config)
		.fields("*")
		.limit(1)
		.search(args.name)
		.request("/games");

	return response.data[0];
};

export default gameLookup;
