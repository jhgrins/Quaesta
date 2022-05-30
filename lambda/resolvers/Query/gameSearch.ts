import apicalypse from "apicalypse";

import { Game } from "../../../types";
import { Context } from "../index";
import { createIGDBRequestConfig } from "../utils";

interface Args {
    name: string;
}

const gameSearch = async (_: any, args: Args, context: Context, info: any): Promise<Game[]> => {
    const config = createIGDBRequestConfig(context.twitchToken as string);
    const response = await apicalypse(config).fields("*").search(args.name).request("/games");
    return response.data[0];
};

export default gameSearch;
