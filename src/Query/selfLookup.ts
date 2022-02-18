import { Context } from "../index";
import { getItem, getItemFromDynamoDBResult } from "../db";
import User from "../User/type";

const selfLookup = async (_: any, args: {}, context: Context, info: any): Promise<User | null> => {
	if (!context.userId) return null;
	const queryOutput = await getItem("quaesta-users", context.userId);
	return getItemFromDynamoDBResult(queryOutput);
};

export default selfLookup;
