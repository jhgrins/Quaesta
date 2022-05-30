import { gql } from "@apollo/client";

export const GetSideBarProfile = gql`
	query GetSideBarProfile {
		selfLookup {
			avatar
		}
	}
`;

export const GetGameDetails = gql`
	query GetGameDetails($id: ID!) {
		gameLookup(id: $id) {
			name
			coverUrl
			genres
			companies
		}
	}
`;

export const GetCurrentUserName = gql`
	query GetSelfLookUp {
		selfLookup {
			username
			name
		}
	}
`;