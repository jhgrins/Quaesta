import { useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
import { GetFullProfile, GetGameDetails } from "../../../graphql/query";

const Riot = () => {
    const { loading, error, data } = useQuery(GetFullProfile);

    const loadingOrError = loading || error;
    if (loadingOrError) {
        return null;
    }

    console.log(data);

    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"}>
            Summoner Name: {data.selfLookup.riotSummonerName || "Connect Your Riot Account!"}
        </Box>
    );
};

export default Riot;
