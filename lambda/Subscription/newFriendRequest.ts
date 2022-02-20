import { Context } from "../index";

interface Args {
	id: string;
}

const newFriendRequest = {
	resolve: (parent: any, args: Args, context: Context, info: any) => {
		return parent.toString();
	},
	subscribe: async (_: any, args: Args, context: Context, info: any) => {
		return await { follow: true, stdout: true, stderr: true };
	}
};

export default newFriendRequest;
