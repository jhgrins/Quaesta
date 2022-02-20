import CryptoJS from "crypto-js";

import { Context } from "../index";
import { checkIsMe } from "../utils";

interface Parent {
	id: string;
	password: string;
}

const password = (parent: Parent, args: any, context: Context, info: any) => {
	checkIsMe(parent, context);
	if (!process.env.PASSWORD_KEY) {
		throw Error("PASSWORD_KEY Is Not Defined");
	}
	const bytes = CryptoJS.AES.decrypt(parent.password, process.env.PASSWORD_KEY);
	return bytes.toString(CryptoJS.enc.Utf8);
};

export default password;
