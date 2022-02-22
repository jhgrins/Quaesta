import { Context } from "../index";
import { publishToSubscribers } from "../../sns";

const subscriptionShowcase = async (_: any, args: {}, context: Context, info: any) => {
	await publishToSubscribers("Hello World!", { subscription: "subscriptionShowcase" });
	return true;
};

export default subscriptionShowcase;
