import { Context } from "../index";
import { getItem, getItemFromDynamoDBResult } from "../../db";
import { User } from "../../../types";

const selfLookup = async (_: any, args: {}, context: Context, info: any): Promise<User | null> => {
	if (!context.userId) return null;
	console.log(context.userId);
	const queryOutput = await getItem("quaesta-users", context.userId);
	return getItemFromDynamoDBResult(queryOutput) as User | null;
};

export default selfLookup;
