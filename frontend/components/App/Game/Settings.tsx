import { useEffect, useState } from "react";

import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CheckIcon from "@mui/icons-material/Check";

const Settings = () => {

    const [newPublicKey, setNewPublicKey] = useState("");
    const [showKeyChangeSuccess, setShowKeyChangeSuccess] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShowKeyChangeSuccess(false), 5000);
        return () => clearTimeout(timeout);
    }, [showKeyChangeSuccess]);

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>Settings</Typography>
            <Box mt={2} display={"flex"} flexDirection={"column"} sx={{ minWidth: 400 }}>
                <Box mb={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box display={"flex"}>
                        <VpnKeyIcon sx={{ mr: 2 }} />
                        {showKeyChangeSuccess && <CheckIcon color={"success"} />}
                    </Box>
                    <LoadingButton
                        loading={true}
                        size={"small"}
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => {}}
                    >
                        Change Public Key
                    </LoadingButton>
                </Box>
                <TextField
                    fullWidth
                    multiline
                    label={"Public Key"}
                    value={newPublicKey}
                    onChange={(e) => setNewPublicKey(e.target.value)}
                />
            </Box>
            <Box mt={4}>
                <LoadingButton
                    size={"small"}
                    variant={"contained"}
                    color={"error"}
                    onClick={() => {}}
                >
                    Delete Satellite
                </LoadingButton>
            </Box>
        </Box>
    );
};

export default Settings;
