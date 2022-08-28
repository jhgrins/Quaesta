import { Box, Button, Grid } from "@mui/material";

export const HomePageSmallButton = (props: any) => {
    return (
        <Button
            sx={{
                width: 220,
                height: 45,
                borderRadius: 200,
                fontSize: 18,
                boxShadow: "none",
                textTransform: "none",
                "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer"
                }
            }}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

export const HomePageLargeButton = (props: any) => {
    return (
        <Button
            sx={{
                width: 220,
                height: 45,
                borderRadius: 200,
                fontSize: 18,
                boxShadow: "none",
                textTransform: "none",
                "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer"
                },

                color: "black"
            }}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

export const SignInButton = (props: any) => {
    const loadingStyles = {
        border: "3px solid #000 !important",
        clip: "rect(0, 10px, 10px, 0)",
        animationFillMode: "forwards",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        animationDelay: "0s",
        animationDuration: "4s",
        animationName: "maskBorder",
        borderRadius: 200,
        display: "block",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    };

    const signInDisabled = {
        color: "white",
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
            boxShadow: "none"
        }
    };

    const signInEnabled = {
        color: "white !important",
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
            boxShadow: "none"
        }
    };

    return (
        <Button
            sx={{
                width: 220,
                height: 45,
                borderRadius: 200,
                fontSize: 18,
                boxShadow: "none",
                textTransform: "none",

                ...(props.disabled ? signInDisabled : signInEnabled)
            }}
            onClick={props.onClick}
            disabled={props.disabled}
            disableElevation
        >
            <Box sx={props.loading ? loadingStyles : undefined} />
            {props.children}
        </Button>
    );
};

export const OAuthButton = (props: any) => {
    return (
        <Button
            sx={{
                backgroundColor: "#FFFFFF",
                boxShadow: "none",
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none"
                }
            }}
            {...props}
        >
            <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                <Grid item>{props.icon}</Grid>
                <Grid item>{props.children}</Grid>
            </Grid>
        </Button>
    );
};
