import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

const genre = async (parent: any, args: any, context: Context, info: any) => {
    const coverData = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "genres",
        parent.genres
    );

    return coverData.map((genre: any) => genre.name);
};

export default genre;
