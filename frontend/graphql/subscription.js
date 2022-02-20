import { gql } from "@apollo/client";

export const NewSatelliteLog = gql`
	subscription NewSatelliteLog($id: ID!) {
		newSatelliteLog(id: $id)
	}
`;
