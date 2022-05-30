import { Game } from "../../../types";
import { Context } from "../index";
import { makeIGDBRequestForRouteById } from "../utils";

interface Args {
    id: string;
}

const gameLookup = async (_: any, args: Args, context: Context, info: any): Promise<Game> => {
    const response = await makeIGDBRequestForRouteById(
        context.twitchToken as string,
        "games",
        args.id
    );
    return response;
};

export default gameLookup;
