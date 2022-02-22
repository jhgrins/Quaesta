export interface User {
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

export interface Game {
	id: string;
	name: string;
	cover?: string;
	genres?: string[];
	companies?: string[];
	status?: GAME_STATUS;
	dateAdded?: DateTime;
	dateCompleted?: DateTime;
	userReview?: Review;
}

export interface Review {
	rating: number;
	title?: string;
	description?: string;
}

export type DateTime = string;
export type GAME_STATUS = "BACKLOG" | "IN_PROGRESS" | "COMPLETED";

export interface Socket {
	connectionId: string;
	operationId?: string;
	connectedAt: number;
	ttl: number;
	userId: string | null;
	method: string | undefined;
}
