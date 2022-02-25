import React from "react";

import { Button, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	largeBoldButton: {
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
	},
	signInEnabled: {
		color: "white",
		backgroundColor: theme.palette.primary.main,
		"&:hover": {
			boxShadow: "none",
			backgroundColor: theme.palette.primary.main
		}
	},
	signInDisabled: {
		color: "white !important",
		backgroundColor: (theme.palette as any).neutral.dark,
		"&:hover": {
			boxShadow: "none",
			backgroundColor: (theme.palette as any).neutral.dark
		}
	},
	signInLoading: {
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
	},
	homePageSmall: {
		width: 100,
		height: 35,
		fontSize: 14,
		color: "black",
		backgroundColor: (theme.palette as any).neutral.main,
		"&:hover": {
			backgroundColor: (theme.palette as any).neutral.main
		}
	},
	homePageLarge: {
		width: 280,
		height: 55,
		color: "black",
		backgroundColor: (theme.palette as any).neutral.main,
		"&:hover": {
			backgroundColor: (theme.palette as any).neutral.main
		}
	},
	OAuth: {
		backgroundColor: "#FFFFFF",
		boxShadow: "none",
		textTransform: "none",
		"&:hover": {
			backgroundColor: "#FFFFFF",
			boxShadow: "none"
		}
	}
}));

export const HomePageSmallButton = (props: any) => {
	const classes = useStyles();
	return (
		<Button
			className={clsx(classes.largeBoldButton, classes.homePageSmall)}
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};

export const HomePageLargeButton = (props: any) => {
	const classes = useStyles();
	return (
		<Button
			className={clsx(classes.largeBoldButton, classes.homePageLarge)}
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};

export const SignInButton = (props: any) => {
	const classes = useStyles();
	return (
		<Button
			className={clsx(
				classes.largeBoldButton,
				props.disabled ? classes.signInDisabled : classes.signInEnabled
			)}
			onClick={props.onClick}
			disabled={props.disabled}
			disableElevation
		>
			<span className={props.loading ? classes.signInLoading : undefined} />
			{props.children}
		</Button>
	);
};

export const OAuthButton = (props: any) => {
	const classes = useStyles();
	return (
		<Button className={classes.OAuth} {...props}>
			<Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
				<Grid item>{props.icon}</Grid>
				<Grid item>{props.children}</Grid>
			</Grid>
		</Button>
	);
};