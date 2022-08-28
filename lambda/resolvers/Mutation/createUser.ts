import { UserInputError } from "apollo-server-errors";

import CryptoJS from "crypto-js";
import { v4 as uuid } from "uuid";

import { generateToken } from "../auth";
import { getItemsByIndex, putItem } from "../../db";
import { Context } from "../index";
import { sendAccountCreatedEmail } from "../../ses";

interface Args {
    email: string;
    username?: string;
    password?: string;
    avatar?: string;
    name?: string;
}

const createUser = async (_: any, args: Args, context: Context, info: any): Promise<string> => {
    await validateEmail(args.email);
    if (args.username) await validateUsername(args.username);
    if (args.password) {
        args.password = CryptoJS.AES.encrypt(
            args.password,
            (process.env.PASSWORD_KEY as string) || "PASSWORD"
        ).toString();
    }

    const randomUserId = uuid();
    await putItem("quaesta-users", { id: randomUserId, ...args });

    console.log(`Sending Account Created Email to ${args.email}`);
    sendAccountCreatedEmail(args.email, args.username as string);
    return generateToken(randomUserId);
};

const validateEmail = async (email: string) => {
    const queryOutput = await getItemsByIndex("quaesta-users", "email", email);
    if (queryOutput.Count && queryOutput.Count > 0) {
        throw new UserInputError("User Already Exists");
    }
};

const validateUsername = async (username: string) => {
    if (username.length > 12) {
        throw new UserInputError("Username Longer Than 12 Characters");
    }
    const queryOutput = await getItemsByIndex("quaesta-users", "username", username);
    if (queryOutput.Count && queryOutput.Count > 0) {
        throw new UserInputError("User Already Exists");
    }
};

export default createUser;
