export default interface User {
	id: string;
	name?: string;
	avatar?: string;
	email: string;
	username?: string;
	password?: string;
	friends: string[];
	incomingFriendRequests: string[];
	outgoingFriendRequests: string[];
	games: string[];
}
