import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { red } from "@mui/material/colors";
import Mail from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import clsx from "clsx";

import { useMutation } from "@apollo/client";
import { CreateUser } from "../../graphql/mutation.js";

import { SignInButton } from "../UI/Buttons";
import Logo from "../UI/Logo";

const useStyles = makeStyles((theme) => ({
	textFieldPadding: {
		marginTop: theme.spacing(1)
	},
	alertPadding: {
		marginTop: theme.spacing(2)
	},
	sectionPadding: {
		marginTop: theme.spacing(4)
	},
	loginFailedAlert: {
		color: "white",
		backgroundColor: red[700],
		borderRadius: 200,
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 15,
		paddingRight: 15
	}
}));

const CreateAccount = (props: any) => {
	const classes = useStyles();
	const [alertText, setAlertText] = useState("");

	useEffect(() => {
		setTimeout(() => setAlertText(""), 10000);
	}, [alertText]);

	return (
		<Box
			height={"100%"}
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			className={"verticalScrollDiv"}
		>
			<Logo height={60} />
			<Box
				flexGrow={1}
				width={"100%"}
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				className={classes.sectionPadding}
			>
				<Typography variant={"h5"} align={"center"}>
					Create Account
				</Typography>
				<Typography variant={"body1"} align={"center"} className={classes.textFieldPadding}>
					Give us a few details, and you will be on your way.
				</Typography>
				{alertText && <CreateAccountAlert>{alertText}</CreateAccountAlert>}
				<CreateAccountArea setAlertText={setAlertText} />
				<BackToSignInArea />
			</Box>
		</Box>
	);
};

const CreateAccountArea = (props: any) => {
	const classes = useStyles();
	const inviteToken = new URLSearchParams(useLocation().search).get("id");

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// const history = useHistory();

	const [doMutation, { loading }] = useMutation(CreateUser, {
		onCompleted: (data) => {
			localStorage.setItem("token", data.createUser);
			// history.replace({ pathname: "/app" });
		},
		onError: () => {
			props.setAlertText("Username Already Exists");
		}
	});

	const createUser = () => {
		if (!email) {
			props.setAlertText("Please Provide An Email");
		} else if (!username) {
			props.setAlertText("Please Provide A Username");
		} else if (username.length > 12) {
			props.setAlertText("Username Must Be 12 Characters Or Shorter");
		} else if (!password) {
			props.setAlertText("Please Provide A Password");
		} else {
			doMutation({ variables: { inviteToken, email, username, password } });
		}
	};

	return (
		<Box
			width={"100%"}
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			className={classes.sectionPadding}
		>
			<Fields
				email={email}
				setEmail={setEmail}
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				createUser={createUser}
			/>
			<Box className={classes.sectionPadding}>
				<SignInButton onClick={createUser} disabled={loading} loading={loading}>
					Create Account
				</SignInButton>
			</Box>
		</Box>
	);
};

const Fields = (props: any) => {
	const classes = useStyles();
	const moveDown = (currentInputIndex: any) => {
		document.getElementsByTagName("input")[currentInputIndex + 1].focus();
	};

	return (
		<Box
			width={"90%"}
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			style={{ paddingBottom: 20 }}
		>
			<TextField
				fullWidth
				variant={"standard"}
				label={"Email"}
				value={props.email}
				onChange={(e) => props.setEmail(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") moveDown(0);
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Mail />
						</InputAdornment>
					)
				}}
			/>
			<TextField
				fullWidth
				className={classes.textFieldPadding}
				variant={"standard"}
				label={"Username"}
				value={props.username}
				onChange={(e) => props.setUsername(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") moveDown(1);
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AccountCircleIcon />
						</InputAdornment>
					)
				}}
			/>
			<TextField
				fullWidth
				className={classes.textFieldPadding}
				variant={"standard"}
				type={"password"}
				label={"Password"}
				value={props.password}
				onChange={(e) => props.setPassword(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") props.createUser();
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<LockIcon />
						</InputAdornment>
					)
				}}
			/>
		</Box>
	);
};

const BackToSignInArea = (props: any) => {
	const classes = useStyles();
	return (
		<Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={6}>
			<Typography variant={"body2"}>Already have an account?</Typography>
			<Link to={"/login"} style={{ paddingLeft: 5 }}>
				<Typography variant={"body2"} color={"primary"}>
					Sign In
				</Typography>
			</Link>
		</Box>
	);
};

const CreateAccountAlert = (props: any) => {
	const classes = useStyles();
	return (
		<Box className={clsx(classes.alertPadding, classes.loginFailedAlert)}>{props.children}</Box>
	);
};

export default CreateAccount;
