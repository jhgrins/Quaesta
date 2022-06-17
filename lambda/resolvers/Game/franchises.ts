import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

interface Parent {
    franchises: string[];
}

const franchise = async (
    parent: Parent,
    args: any,
    context: Context,
    info: any
): Promise<string[]> => {
    const franchises = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "franchises",
        parent.franchises
    );
    return franchises.map((franchise: { name: string }) => franchise.name);
};

export default franchise;
