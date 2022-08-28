// @ts-nocheck

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Box, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { grey, red } from "@mui/material/colors";

import { useMutation } from "@apollo/client";
import { Login as LoginMutation } from "../../graphql/mutation";

import Logo from "../UI/Logo";
import { OAuthButton, SignInButton } from "../UI/Buttons";

import AppleLogin from "react-apple-login";

const GoogleClientID = "168855317619-5f94l4jsoifl5jk5g6js5mj0eim8g4f6.apps.googleusercontent.com";

const Login = () => {
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
                sx={{ mt: 3 }}
            >
                <Typography variant={"h5"} align={"center"}>
                    Quaesta
                </Typography>
                {alertText && <LoginAlert>{alertText}</LoginAlert>}
                <SignInArea setAlertText={setAlertText} />
                <DividerArea />
                <OAuthArea />
                <CreateAccountArea />
            </Box>
        </Box>
    );
};

const SignInArea = (props: any) => {
    const navigate = useNavigate();

    const [idField, setIdField] = useState("");
    const [password, setPassword] = useState("");

    const [doMutation, { loading }] = useMutation(LoginMutation, {
        onCompleted: (data) => {
            localStorage.setItem("token", data.loginUser);
            navigate("/app/game/animal crossing new horizons");
        },
        onError: () => {
            props.setAlertText("Incorrect Username or Password");
        }
    });

    const validateEmail = (text: any) => /\S+@\S+\.\S+/.test(text);

    const login = () => {
        if (!idField) {
            props.setAlertText("Please Provide A Username or Email");
        } else if (!password) {
            props.setAlertText("Please Provide A Password");
        } else {
            const isEmail = validateEmail(idField);
            doMutation({
                variables: {
                    userPair: { key: isEmail ? "email" : "username", value: idField },
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
            sx={{ mt: 3 }}
        >
            <Fields
                idField={idField}
                setIdField={setIdField}
                password={password}
                setPassword={setPassword}
                login={login}
            />
            <Box sx={{ mt: 3 }}>
                <SignInButton onClick={login} disabled={loading} loading={loading}>
                    Sign in
                </SignInButton>
            </Box>
        </Box>
    );
};

const Fields = (props: any) => {
    const [showPassword, setShowPassword] = useState(false);

    const moveDown = (currentInputIndex: any) => {
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
                    sx={{ mt: 1 }}
                    fullWidth
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

const DividerArea = () => {
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

const OAuthArea = () => {
    useEffect(() => {
        // eslint-disable-next-line no-undef
        google.accounts.id.initialize({
            client_id: GoogleClientID,
            auto_select: true,
            login_uri:
                import.meta.env.VITE_GOOGLE_LOGIN_ENDPOINT || "http://localhost:8000/dev/google-login",
            ux_mode: "redirect"
        });

        // eslint-disable-next-line no-undef
        google.accounts.id.renderButton(document.getElementById("googleLoginButton"));
    }, []);

    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ paddingTop: 16 }}
        >
            <Box pr={1}>
                <AppleLogin
                    clientId={"com.quaesta.signin"}
                    redirectURI={
                        import.meta.env.VITE_APPLE_LOGIN_ENDPOINT || "http://localhost:8000/dev/apple-login"
                    }
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
                <div id={"googleLoginButton"} />
            </Box>
        </Box>
    );
};

const AppleIcon = () => {
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

const CreateAccountArea = () => {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ mt: 3 }}>
            <Typography variant={"body2"}>New?</Typography>
            <Link to={"/create-account"} style={{ paddingLeft: 5 }}>
                <Typography variant={"body2"} color={"primary"}>
                    Create Account
                </Typography>
            </Link>
        </Box>
    );
};

const LoginAlert = (props: any) => {
    return (
        <Box
            sx={{
                mt: 2,
                color: "white",
                backgroundColor: red[700],
                borderRadius: 200,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 15,
                paddingRight: 15
            }}
        >
            {props.children}
        </Box>
    );
};

export default Login;
