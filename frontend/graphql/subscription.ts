import { gql } from "@apollo/client";

export const NewFriendRequest = gql`
	subscription NewFriendRequest {
		newFriendRequest
	}
`;
