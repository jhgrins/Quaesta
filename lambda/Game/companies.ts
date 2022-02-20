import apicalypse from "apicalypse";

import { BaseGameAPI } from "../db";
import { Context } from "../index";
import { callTwitch } from "../utils";

const companies = async (parent: any, args: any, context: Context, info: any) => {
	const accessToken = (await callTwitch()).access_token;
	let config = {
		method: "post",
		headers: {
			"Client-ID": process.env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: BaseGameAPI
	};


	const resp1 = await apicalypse(config)
		.fields("*")
		.where(parent.involved_companies.map((company: any) => `id = ${company}`).join(" | "))
		.request("/involved_companies");


	const response = await apicalypse(config)
		.fields("*")
		.where(resp1.data.map((company: any) => `id = ${company.company}`).join(" | "))
		.request("/companies");

	return response.data.map((company: any) => company.name);
};

export default companies;
