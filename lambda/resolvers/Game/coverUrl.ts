import { Context } from "../index";
import { makeIGDBRequestForRouteById } from "../utils";

interface Parent {
    cover: string;
}

const coverUrl = async (
    parent: Parent,
    args: any,
    context: Context,
    info: any
): Promise<string> => {
    const coverData = await makeIGDBRequestForRouteById(
        context.twitchToken as string,
        "covers",
        parent.cover
    );
    return "https://images.igdb.com/igdb/image/upload/t_1080p_2x/" + coverData.image_id + ".jpg";
};

export default coverUrl;
