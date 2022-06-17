import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

interface Parent {
    game_engines: string[];
}

const gameEngines = async (
    parent: Parent,
    args: any,
    context: Context,
    info: any
): Promise<string[] | null> => {
    if (!parent.game_engines) return [];
    const gameEngines = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "game_engines",
        parent.game_engines
    );
    return gameEngines.map((gameEngine: { name: string }) => gameEngine.name);
};

export default gameEngines;
