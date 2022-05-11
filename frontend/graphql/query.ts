import { gql } from "@apollo/client";

export const GetSideBarProfile = gql`
	query GetSideBarProfile {
		selfLookup {
			avatar
		}
	}
`;

export const GetGameDetails = gql`
	query GetGameDetails($name: String!) {
		gameLookup(name: $name) {
			name
			cover
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