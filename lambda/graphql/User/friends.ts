import { Context } from "../index";
import { checkIsMe } from "../utils";
import { getItemFromDynamoDBResult, getItemsByIndex } from "../../db";

interface Parent {
	id: string;
	friends: string[];
}

const friends = (parent: Parent, args: any, context: Context, info: any) => {
	checkIsMe(parent, context);
	return Promise.all(
		parent.friends.map(async (email) => {
			const queryOutput = await getItemsByIndex("users", "email", email);
			return getItemFromDynamoDBResult(queryOutput);
		})
	);
};

export default friends;
