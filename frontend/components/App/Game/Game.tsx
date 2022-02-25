import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
import { GetGameDetails } from "../../../graphql/query";

const Game = () => {
	const { gameName } = useParams() as any;
	const { loading, error, data } = useQuery(GetGameDetails, {
		variables: { name: gameName }
	});

	const loadingOrError = loading || error;
	if (loadingOrError) {
		return null;
	}
	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Typography sx={{ fontSize: 40, fontWeight: 500 }}>
				{loadingOrError ? (
					"Loading"
				) : (
					<Box>
						{data.gameLookup.name}{" "}
						<img
							style={{ width: "30px" }}
							src={data.gameLookup.cover}
							alt={`${data.gameLookup.name}'s game cover`}
						></img>
					</Box>
				)}
			</Typography>
			<Box
				mt={4}
				flexGrow={1}
				minHeight={500}
				className={"verticalScrollDiv"}
				display={"flex"}
				flexDirection={"column"}
			>
				<p>{data.gameLookup.genres.join(", ")}</p>
				<p>Made by {data.gameLookup.companies.join(", ")}</p>
			</Box>
		</Box>
	);
};

export default Game;
