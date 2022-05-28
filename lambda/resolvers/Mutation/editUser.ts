import CryptoJS from "crypto-js";

import { UserInputError } from "apollo-server-errors";

import { getItemFromDynamoDBResult, getItemsByIndex, updateItem } from "../../db";
import { Context } from "../index";
import { checkIsLoggedIn } from "../utils";

interface Args {
    userPairs: {
        key: string;
        value: string;
    }[];
}

const editUser = async (_: any, args: Args, context: Context, info: any) => {
    await checkIsLoggedIn(context);

    let queryOutput;
    for (const userValue of args.userPairs) {
        if (userValue.key === "email") {
            await validateEmail(userValue.value);
        }
        if (userValue.key === "username") {
            await validateUsername(userValue.value);
        }
        if (userValue.key === "password") {
            userValue.value = CryptoJS.AES.encrypt(
                userValue.value,
                (process.env.PASSWORD_KEY as string) || "PASSWORD"
            ).toString();
        }
        queryOutput = await updateItem(
            "quaesta-users",
            context.userId as string,
            userValue.key,
            userValue.value
        );
    }

    return queryOutput ? getItemFromDynamoDBResult(queryOutput) : null;
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

export default editUser;
