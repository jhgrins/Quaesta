import { Context } from "../index";

interface Parent {
    rating_count: number;
}

const ratingCount = (parent: Parent, args: any, context: Context, info: any): number => {
    return parent.rating_count;
};

export default ratingCount;
