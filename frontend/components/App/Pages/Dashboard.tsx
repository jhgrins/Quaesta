import { useQuery } from "@apollo/client";
import { Box, Typography, Paper } from "@mui/material";
import { GetCurrentUserName } from "../../../graphql/query";

const DashBoard = () => {
    const { loading, data } = useQuery(GetCurrentUserName);
    if (loading) {
        return null;
    }
    const { selfLookup } = data;
    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"}>
            <Typography sx={{ fontSize: 40, fontWeight: 500 }}>Dashboard</Typography>
            <Box mt={4} flexGrow={1} minHeight={500} className={"verticalScrollDiv"}>
                Hello, {(selfLookup && (selfLookup.name || selfLookup.username)) || "There"}!
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"}>
                    <Paper elevation={3} square sx={{ width: "100px", height: "100px" }}>
                        Icebox
                    </Paper>
                    <Paper elevation={3} square sx={{ width: "100px" }}>
                        ToDo
                    </Paper>
                    <Paper elevation={3} square sx={{ width: "100px" }}>
                        In Progress
                    </Paper>
                    <Paper elevation={3} square sx={{ width: "100px" }}>
                        Done
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default DashBoard;
