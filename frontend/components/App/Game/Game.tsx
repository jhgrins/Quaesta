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
                <Box border={1} minWidth={400} height={400} mr={8}>
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
                    <Typography>Made by {data.gameLookup.companies.join(", ")}</Typography>
                    <Typography>Franchises {data.gameLookup.franchises.join(", ")}</Typography>
                    <Typography>Game Engines: {data.gameLookup.gameEngines.join(", ")}</Typography>
                    <Typography>Genres: {data.gameLookup.genres.join(", ")}</Typography>
                    <Typography>Platforms {data.gameLookup.platforms.join(", ")}</Typography>
                    <Typography>Rating: {data.gameLookup.rating}</Typography>
                    <Typography>Rating Count: {data.gameLookup.ratingCount}</Typography>
                    <Typography>Rating Count: {data.gameLookup.ratingCount}</Typography>
                    <Typography>Videos: {data.gameLookup.videos.join(", ")}</Typography>
                </Box>
            </Box>
            <Box display={"flex"} mt={4}>
                {data.gameLookup.artworks.map((artwork: string, index: number) => (
                    <Box border={1} width={200} height={200} mr={2} key={index}>
                        <img
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            src={artwork}
                            alt={`${data.gameLookup.name}'s game cover`}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Game;
