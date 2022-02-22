import { Context } from "../index";
import { publish } from "../../sns";

const testMutation = async (_: any, args: {}, context: Context, info: any) => {
	await publish("Subscription", "newFriendRequest", { test: "Hello World!" });
	return true;
};

export default testMutation;
