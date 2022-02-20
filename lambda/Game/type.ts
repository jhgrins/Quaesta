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
