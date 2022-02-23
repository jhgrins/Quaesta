import React, { useEffect, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { Box, Divider, TextField, InputAdornment, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import makeStyles from "@mui/styles/makeStyles";
import { grey, red } from "@mui/material/colors";
import clsx from "clsx";

import { useMutation } from "@apollo/client";
import {
	Login as LoginMutation,
	GoogleLogin as GoogleLoginMutation
} from "../../graphql/mutation.js";

import Logo from "../UI/Logo";
import { OAuthButton, SignInButton } from "../UI/Buttons";

import { GoogleLogin } from "react-google-login";
const GoogleClientID = "358595367659-2qlsasdtkdbml8gvfca105gaaq0kkvh4.apps.googleusercontent.com";

import AppleLogin from "react-apple-login";

const useStyles = makeStyles((theme) => ({
	textFieldPadding: {
		marginTop: theme.spacing(1)
	},
	alertPadding: {
		marginTop: theme.spacing(2)
	},
	sectionPadding: {
		marginTop: theme.spacing(3)
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

const Login = (props) => {
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
			<Logo black height={60} />
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
					Quaesta
				</Typography>
				{alertText && <LoginAlert>{alertText}</LoginAlert>}
				<SignInArea setAlertText={setAlertText} />
				<DividerArea style={{ width: "90%" }} />
				<OAuthArea />
				<CreateAccountArea />
			</Box>
		</Box>
	);
};

const SignInArea = (props) => {
	const classes = useStyles();
	const navigate = useNavigate();

	const [idField, setIdField] = useState("");
	const [password, setPassword] = useState("");

	const [doMutation, { loading }] = useMutation(LoginMutation, {
		onCompleted: (data) => {
			localStorage.setItem("token", data.loginUser);
			navigate("/app/game/animal crossing new horizons");
		},
		onError: (err) => {
			props.setAlertText("Incorrect Username or Password");
		}
	});

	const validateEmail = (text) => /\S+@\S+\.\S+/.test(text);

	const login = () => {
		if (!idField) {
			props.setAlertText("Please Provide A Username or Email");
		} else if (!password) {
			props.setAlertText("Please Provide A Password");
		} else {
			const isEmail = validateEmail(idField);
			doMutation({
				variables: {
					type: isEmail ? "email" : "username",
					value: idField,
					password
				}
			});
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
				idField={idField}
				setIdField={setIdField}
				password={password}
				setPassword={setPassword}
				login={login}
			/>
			<Box className={classes.sectionPadding}>
				<SignInButton onClick={login} disabled={loading} loading={loading}>
					Sign in
				</SignInButton>
			</Box>
		</Box>
	);
};

const Fields = (props) => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);

	const moveDown = (currentInputIndex) => {
		document.getElementsByTagName("input")[currentInputIndex + 1].focus();
	};

	return (
		<Box
			width={"100%"}
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
		>
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
					autoComplete={"username"}
					size={"medium"}
					label={"Email or Username"}
					value={props.idField}
					onChange={(e) => props.setIdField(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") moveDown(0);
					}}
				/>
				<TextField
					fullWidth
					className={classes.textFieldPadding}
					variant={"standard"}
					type={showPassword ? "" : "password"}
					autoComplete={"current-password"}
					label={"Password"}
					value={props.password}
					onChange={(e) => props.setPassword(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") props.login();
					}}
					InputProps={{
						endAdornment: props.password && (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
			</Box>
			<Box style={{ marginLeft: "auto", paddingRight: 25 }}>
				<Link to={"/forgot-password"}>
					<Typography variant={"body2"} color={"primary"}>
						Forgot password?
					</Typography>
				</Link>
			</Box>
		</Box>
	);
};

const DividerArea = (props) => {
	return (
		<Box
			width={"90%"}
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			style={{ paddingTop: 32 }}
		>
			<Box style={{ width: "40%" }}>
				<Divider />
			</Box>
			<Typography
				style={{ color: grey[600], paddingLeft: 15, paddingRight: 15, fontSize: 14 }}
			>
				or
			</Typography>
			<Box style={{ width: "40%" }}>
				<Divider />
			</Box>
		</Box>
	);
};

const OAuthArea = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [redirectInProgress, setRedirectInProgress] = useState(false);

	const [doMutation] = useMutation(GoogleLoginMutation, {
		onCompleted: (data) => {
			localStorage.setItem("token", data.googleLogin.token);
			navigate(data.googleLogin.redirectPath);
		}
	});

	if (location.hash && !redirectInProgress) {
		const pairsInString = location.hash.slice(1).split("&");
		const pairsInArray = pairsInString.map((pair) => pair.split("="));
		const pairsInObject = pairsInArray.reduce((prev, curr) => {
			prev[curr[0]] = curr[1];
			return prev;
		}, {});
		const idToken = (pairsInObject as any).id_token;
		localStorage.removeItem("token");
		setRedirectInProgress(true);
		doMutation({ variables: { token: idToken } });
	}

	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			style={{ paddingTop: 16 }}
		>
			<Box pr={1}>
				<AppleLogin
					clientId={"com.meta-games.kings-corner-service"}
					redirectURI={"https://quaesta.dev/apple-login"}
					scope={"name email"}
					responseType={"code id_token"}
					responseMode={"form_post"}
					render={(props) => (
						<OAuthButton
							onClick={props.onClick}
							disabled={props.disabled}
							icon={<AppleIcon />}
						>
							Sign in with Apple
						</OAuthButton>
					)}
				/>
			</Box>
			<Box pl={1}>
				<GoogleLogin
					clientId={GoogleClientID}
					cookiePolicy={"single_host_origin"}
					uxMode={"redirect"}
					redirectUri={
						IS_OFFLINE ? "http://localhost:3000/login" : "https://quaesta.dev/login"
					}
					onFailure={(err) => console.log(err)}
					render={(props) => (
						<OAuthButton
							onClick={props.onClick}
							disabled={props.disabled}
							icon={<GoogleIcon />}
						>
							Sign in with Google
						</OAuthButton>
					)}
				/>
			</Box>
		</Box>
	);
};

const AppleIcon = (props) => {
	return (
		<Box m={-1} style={{ marginRight: -10, paddingTop: 4 }}>
			<svg
				width="40"
				height="40"
				viewBox="0 0 560 400"
				xmlns="http://www.w3.org/2000/svg"
				fillRule="evenodd"
				clipRule="evenodd"
			>
				<path
					d="M291.813 84.366c18.398-24.248 43.974-24.366 43.974-24.366s3.804 22.797-14.472 44.758c-19.515 23.45-41.697 19.613-41.697 19.613s-4.165-18.442 12.195-40.005zm-9.855 55.974c9.465 0 27.03-13.01 49.894-13.01 39.357 0 54.84 28.005 54.84 28.005s-30.282 15.482-30.282 53.049c0 42.379 37.723 56.985 37.723 56.985s-26.37 74.22-61.988 74.22c-16.359 0-29.077-11.024-46.314-11.024-17.565 0-34.996 11.435-46.35 11.435-32.524.001-73.614-70.405-73.614-126.999 0-55.681 34.78-84.891 67.402-84.891 21.207 0 37.664 12.23 48.689 12.23z"
					fill="#737373"
				/>
			</svg>
		</Box>
	);
};

const GoogleIcon = (props) => {
	return (
		<Box style={{ paddingTop: 7 }}>
			<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
				<g fill="#000" fillRule="evenodd">
					<path
						d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
						fill="#EA4335"
					/>
					<path
						d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
						fill="#4285F4"
					/>
					<path
						d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
						fill="#FBBC05"
					/>
					<path
						d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
						fill="#34A853"
					/>
					<path fill="none" d="M0 0h18v18H0z" />
				</g>
			</svg>
		</Box>
	);
};

const CreateAccountArea = (props) => {
	const classes = useStyles();
	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			className={classes.sectionPadding}
		>
			<Typography variant={"body2"}>New?</Typography>
			<Link to={"/create-account"} style={{ paddingLeft: 5 }}>
				<Typography variant={"body2"} color={"primary"}>
					Create Account
				</Typography>
			</Link>
		</Box>
	);
};

const LoginAlert = (props) => {
	const classes = useStyles();
	return (
		<Box className={clsx(classes.alertPadding, classes.loginFailedAlert)}>{props.children}</Box>
	);
};

export default Login;
