import { Context } from "../index";
import { checkIsMe } from "../utils";

interface Parent {
	id: string;
	email: string;
}

const email = (parent: Parent, args: any, context: Context, info: any) => {
	checkIsMe(parent, context);
	return parent.email;
};

export default email;
