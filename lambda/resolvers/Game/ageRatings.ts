import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

interface Parent {
    age_ratings: string[];
}

const ageRatings = async (parent: any, args: any, context: Context, info: any) => {
    const ageRatings = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "age_ratings",
        parent.age_ratings
    );
    return [];
};

export default ageRatings;
