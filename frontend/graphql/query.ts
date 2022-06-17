import { gql } from "@apollo/client";

export const GetSideBarProfile = gql`
	query GetSideBarProfile {
		selfLookup {
			avatar
		}
	}
`;

export const GameSearch = gql`
    query GameSearch($name: String!) {
        gameSearch(name: $name) {
            id
            name
        }
    }
`;

export const GetGameDetails = gql`
    query GetGameDetails($id: ID!) {
        gameLookup(id: $id) {
            ageRatings
            artworks
            companies
            coverUrl
            dlcs
            franchises
            gameEngines
            genres
            name
            platforms
			rating
            ratingCount
            videos
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