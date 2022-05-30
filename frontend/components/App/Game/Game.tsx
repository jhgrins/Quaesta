import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
import { GetGameDetails } from "../../../graphql/query";

const Game = () => {
    const { gameId } = useParams() as any;
    const { loading, error, data } = useQuery(GetGameDetails, {
        variables: { id: gameId }
    });

    const loadingOrError = loading || error;
    if (loadingOrError) {
        return null;
    }
    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"}>
            <Box display={"flex"}>
                <Box border={1} width={400} height={400} mr={8}>
                    <img
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        src={data.gameLookup.coverUrl}
                        alt={`${data.gameLookup.name}'s game cover`}
                    />
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                    <Typography sx={{ fontSize: 40, fontWeight: 500 }}>
                        {loadingOrError ? "Loading" : <Box>{data.gameLookup.name} </Box>}
                    </Typography>
                    <p>{data.gameLookup.genres.join(", ")}</p>
                    <p>Made by {data.gameLookup.companies.join(", ")}</p>
                </Box>
            </Box>
        </Box>
    );
};

export default Game;
