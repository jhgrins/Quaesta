import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

interface Parent {
    platforms: string[];
}

const platforms = async (
    parent: Parent,
    args: any,
    context: Context,
    info: any
): Promise<string[]> => {
    const platforms = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "platforms",
        parent.platforms
    );
    return platforms.map((platform: { name: string }) => platform.name);
};

export default platforms;
