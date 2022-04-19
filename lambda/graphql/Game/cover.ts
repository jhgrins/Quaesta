import apicalypse, { ApicalypseConfig } from "apicalypse";

import { BaseGameAPI } from "../../db";
import { Context } from "../index";
import { getTwitchAccessToken } from "../utils";

const cover = async (parent: any, args: any, context: Context, info: any) => {
	const accessToken = (await getTwitchAccessToken()).access_token;
	const config: ApicalypseConfig = {
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
