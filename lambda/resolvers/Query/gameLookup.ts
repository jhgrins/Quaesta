import { Game } from "../../../types";
import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

interface Args {
    id: string;
}

const gameLookup = async (_: any, args: Args, context: Context, info: any): Promise<Game> => {
    return (
        await makeIGDBRequestForRouteByIds(context.twitchToken as string, "games", [args.id])
    )[0];
};

export default gameLookup;
