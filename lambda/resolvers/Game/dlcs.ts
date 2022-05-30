import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

interface Parent {
    dlcs: string[];
}

const dlcs = async (parent: Parent, args: any, context: Context, info: any): Promise<string[]> => {
    return [];
};

export default dlcs;
