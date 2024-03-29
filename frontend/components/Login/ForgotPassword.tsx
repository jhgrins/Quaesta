import { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";

import { useMutation } from "@apollo/client";
import { EditUser, SendResetPasswordEmail } from "../../graphql/mutation";

import { SignInButton } from "../UI/Buttons";
import Logo from "../UI/Logo";

const validateEmail = (text: any) => /\S+@\S+\.\S+/.test(text);

const ForgotPassword = () => {
    const authToken = new URLSearchParams(useLocation().search);
    return !authToken.get("id") ? (
        <ForgotPasswordEntry />
    ) : (
        <ForgotPasswordAuthToken authToken={authToken} />
    );
};

const ForgotPasswordEntry = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [alertText, setAlertText] = useState("");

    // useEffect(() => {
    // 	setTimeout(() => setShowLoginFailedAlert(false), 10000);
    // }, [alertText]);

    return (
        <Box
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            className={"verticalScrollDiv"}
        >
            <Logo black height={50} />
            <Box
                flexGrow={1}
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                {!emailSent ? (
                    <>
                        <Typography variant={"h5"} align={"center"}>
                            Forgot Password
                        </Typography>
                        <Typography variant={"body1"} align={"center"}>
                            {"Don't worry, it happens to the best of us."}
                        </Typography>
                        {alertText && <ForgotPasswordAlert>{alertText}</ForgotPasswordAlert>}
                        <ForgotPasswordArea
                            setAlertText={setAlertText}
                            setEmailSent={setEmailSent}
                        />
                    </>
                ) : (
                    <EmailSentConfirmation
                        mainText={"Email Sent"}
                        subText={
                            "If an account exists with those credentials, a link to reset your password will be sent to the associated email"
                        }
                    />
                )}
                <BackToSignInArea />
            </Box>
        </Box>
    );
};

const ForgotPasswordArea = (props: any) => {
    const [idField, setIdField] = useState("");

    const [doMutation, { loading }] = useMutation(SendResetPasswordEmail, {
        onCompleted: () => {
            props.setEmailSent(true);
        },
        onError: () => {
            props.setAlertText("User Not Found");
        }
    });

    const sendResetPasswordEmailMutation = () => {
        if (!idField) {
            props.setAlertText("Please Provide A Username or Email");
        } else {
            const isEmail = validateEmail(idField);
            doMutation({
                variables: {
                    userPair: { key: isEmail ? "email" : "username", value: idField }
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
        >
            <EmailField
                sendResetPasswordEmailMutation={sendResetPasswordEmailMutation}
                idField={idField}
                setIdField={setIdField}
                label={"Username or Email"}
            />
            <Box>
                <SignInButton
                    onClick={() => sendResetPasswordEmailMutation()}
                    disabled={loading}
                    loading={loading}
                >
                    Reset Account
                </SignInButton>
            </Box>
        </Box>
    );
};

const ForgotPasswordAuthToken = (props: any) => {
    const [newPasswordEmail, setNewPasswordEmail] = useState(false);

    useEffect(() => {
        localStorage.setItem("token", props.authToken.get("id"));
    }, []);

    return (
        <Box
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            className={"verticalScrollDiv"}
        >
            <Logo black height={50} />
            <Box
                flexGrow={1}
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                {!newPasswordEmail ? (
                    <>
                        <Typography variant={"h5"} align={"center"}>
                            Please Enter a New Password
                        </Typography>
                        <NewPassowrdArea {...props} setNewPasswordEmail={setNewPasswordEmail} />
                        <BackToSignInArea />
                    </>
                ) : (
                    <EmailSentConfirmation
                        mainText={"Password Changed"}
                        subText={"Your password is now updated!"}
                    />
                )}
            </Box>
        </Box>
    );
};

const NewPassowrdArea = (props: any) => {
    const [idField, setIdField] = useState("");
    const [doMutation, { loading }] = useMutation(EditUser, {
        onCompleted: () => {
            props.setNewPasswordEmail(true);
        }
    });

    const editUser = () => {
        doMutation({
            variables: {
                userPairs: [{ type: "password", value: idField }]
            }
        });
    };

    return (
        <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <PasswordField
                editUser={editUser}
                idField={idField}
                setIdField={setIdField}
                label={"New Password"}
            />
            <Box>
                <SignInButton onClick={() => editUser()} disabled={loading} loading={loading}>
                    Change Password
                </SignInButton>
            </Box>
        </Box>
    );
};

const EmailSentConfirmation = (props: any) => {
    return (
        <>
            <Typography variant={"h5"} align={"center"}>
                {props.mainText}
            </Typography>
            <Typography
                variant={"body1"}
                align={"center"}
                className={props.classes.textFieldPadding}
            >
                {props.subText}
            </Typography>
            <BackToSignInArea />
        </>
    );
};

const EmailField = (props: any) => {
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
                size={"medium"}
                label={props.label}
                value={props.idField}
                onChange={(e) => props.setIdField(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") props.sendResetPasswordEmailMutation();
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircleIcon />
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    );
};

const PasswordField = (props: any) => {
    const [showPassword, setShowPassword] = useState(false);

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
                size={"medium"}
                type={showPassword ? "" : "password"}
                label={props.label}
                value={props.idField}
                onChange={(e) => props.setIdField(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") props.editUser();
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),

                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    );
};

const BackToSignInArea = () => {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant={"body2"}>Suddenly Remember?</Typography>
            <Link to={"/login"} style={{ paddingLeft: 5 }}>
                <Typography variant={"body2"} color={"primary"}>
                    Sign In
                </Typography>
            </Link>
        </Box>
    );
};

const ForgotPasswordAlert = (props: any) => {
    return <Box>{props.children}</Box>;
};

export default ForgotPassword;
