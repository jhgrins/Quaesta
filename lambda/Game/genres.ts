import apicalypse from "apicalypse";

import { BaseGameAPI } from "../db";
import { Context } from "../index";
import { callTwitch } from "../utils";

const genre = async (parent: any, args: any, context: Context, info: any) => {
	const accessToken = (await callTwitch()).access_token;
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
		.where(parent.genres.map((genre: number) => `id = ${genre}`).join(" | "))
		.request("/genres");

	return response.data.map((genre: any) => genre.name);
};

export default genre;
