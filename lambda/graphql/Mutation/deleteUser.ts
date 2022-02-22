import { deleteItem } from "../../db";
import { Context } from "../index";
import { checkIsLoggedIn } from "../utils";

const deleteUser = async (_: any, args: {}, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	deleteItem("users", context.userId as string);
	return true;
};

export default deleteUser;
