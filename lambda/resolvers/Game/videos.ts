import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

interface Parent {
    videos: string[];
}

const videos = async (
    parent: Parent,
    args: any,
    context: Context,
    info: any
): Promise<string[]> => {
    const videos = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "game_videos",
        parent.videos
    );
    return videos.map((video: { name: string }) => video.name);
};

export default videos;
