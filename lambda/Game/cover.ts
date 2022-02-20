import apicalypse from "apicalypse";

import { BaseGameAPI } from "../db";
import { Context } from "../index";
import { callTwitch } from "../utils";

const cover = async (parent: any, args: any, context: Context, info: any) => {
	const accessToken = (await callTwitch()).data.access_token;
	let config = {
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
		.where(`game = ${parent.id}`)
		.request("/covers");

	return response.data[0].url;
};

export default cover;
