import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

interface Parent {
    artworks: string[];
}

const artworks = async (
    parent: Parent,
    args: any,
    context: Context,
    info: any
): Promise<string[]> => {
    if (!parent.artworks) {
        return [];
    }
    
    const artworks = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "artworks",
        parent.artworks
    );
    console.debug(artworks);
    return artworks.map(
        (artwork: { image_id: string }) =>
            "https://images.igdb.com/igdb/image/upload/t_1080p_2x/" + artwork.image_id + ".jpg"
    );
};

export default artworks;
