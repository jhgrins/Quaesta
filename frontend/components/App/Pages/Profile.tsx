import React, { useState } from "react";

// import { useHistory } from "react-router-dom";
import {
	Avatar,
	Button,
	Box,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useQuery, useMutation } from "@apollo/client";
// import { GetFullProfile } from "../../../graphql/query.js";
import { EditUser, DeleteUser } from "../../../graphql/mutation.js";

const Profile = () => {
	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Typography sx={{ fontSize: 40, fontWeight: 500 }}>Profile</Typography>
			<Box mt={4}>
				<UserDetails />
				<InviteLinks />
				<AccountSettings />
			</Box>
		</Box>
	);
};

const UserDetails = (props: any) => {
	const GetFullProfile: any = null;
	const { loading, error, data } = useQuery(GetFullProfile);
	const [editUser] = useMutation(EditUser, { refetchQueries: [GetFullProfile] });

	if (loading || error) return null;

	const handleCapture = (event: any) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(event.target.files[0]);
		fileReader.onload = (event: any) => {
			let img = document.createElement("img");
			img.onload = function () {
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext("2d");

				const dimension = 200;
				canvas.width = dimension;
				canvas.height = dimension;

				if (ctx) {
					ctx.drawImage(this as any, 0, 0, dimension, dimension);
					editUser({
						variables: { avatar: canvas.toDataURL() }
					});
				}
			};
			if (event.target) {
				img.src = event.target.result as string;
			}
		};
	};

	return (
		<Box p={4} display={"flex"} alignItems={"center"}>
			<Box position={"relative"}>
				<Avatar
					alt={"User Profile"}
					src={data.selfLookup.avatar}
					style={{ width: 150, height: 150 }}
				/>
				<Box position={"absolute"} bottom={-5} right={-5}>
					<input
						accept="image/*"
						id="button-file"
						type="file"
						onChange={handleCapture}
						style={{ display: "none" }}
					/>
					<label htmlFor="button-file">
						<IconButton color={"primary"} component="span">
							<AddPhotoAlternateIcon />
						</IconButton>
					</label>
				</Box>
			</Box>
			<Box ml={4}>
				<Typography variant={"h4"}>{data.selfLookup.username}</Typography>
			</Box>
			<Box ml={4} display={"flex"} flexDirection={"column"}>
				<Fields data={data.selfLookup} editUser={editUser} />
			</Box>
		</Box>
	);
};

const Fields = (props: any) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = (event: any) => event.preventDefault();

	return (
		<>
			<Field value={props.data.email} label={"Email"} editUser={props.editUser} />
			<Field
				value={props.data.username}
				label={"Username"}
				style={{ marginTop: 15 }}
				editUser={props.editUser}
			/>
			<Field
				editUser={props.editUser}
				value={props.data.password}
				label={"Password"}
				style={{ marginTop: 15 }}
				type={showPassword ? "text" : "password"}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		</>
	);
};

const Field = (props: any) => {
	const [value, setValue] = useState(props.value);
	const [disabled, setDisabled] = useState(true);
	return (
		<Box
			display={"flex"}
			justifyContent={"space-between"}
			alignItems={"center"}
			style={props.style}
		>
			<TextField
				fullWidth
				size="small"
				label={props.label}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type={props.type}
				InputProps={props.InputProps}
				disabled={disabled}
			/>
			<Box ml={4}>
				<IconButton
					color="primary"
					onClick={() => {
						if (!disabled) {
							props.editUser({ variables: { [props.label.toLowerCase()]: value } });
						}
						setDisabled(!disabled);
					}}
				>
					{disabled ? <CreateIcon /> : <SaveIcon />}
				</IconButton>
			</Box>
		</Box>
	);
};

const InviteLinks = (props: any) => {
	const [email, setEmail] = useState("");
	const GetFullProfile: any = null;
	const { loading, error, data } = useQuery(GetFullProfile);

	if (loading || error) return null;

	return (
		<Box mt={4} display={"flex"} flexDirection={"column"}>
			<Typography sx={{ fontSize: 20, fontWeight: 500 }}>Invites</Typography>
			<Box mt={4} display={"flex"}>
				<Box p={4} display={"flex"} alignItems={"center"}>
					<Box display={"flex"} flexDirection={"column"}>
						{data.selfLookup.invites.map((invite: any, index: any) => (
							<Box key={index}>
								<Typography sx={{ fontSize: 12, fontWeight: 400 }}>
									{invite.email}
								</Typography>
								<Typography sx={{ fontSize: 12, fontWeight: 400 }}>
									{invite.link}
								</Typography>
								<Button>Delete Invite Link</Button>
							</Box>
						))}
					</Box>

					<Box display={"flex"}>
						<TextField
							value={email}
							label={"Email"}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Box ml={4}>
							<Button variant={"contained"} color={"secondary"}>
								Generate Invite Link
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const AccountSettings = (props: any) => {
	// const history = useHistory();
	const [deleteUser] = useMutation(DeleteUser, {
		// onCompleted: () => history.push("/login")
	});
	return (
		<Box mt={4} display={"flex"} flexDirection={"column"}>
			<Typography sx={{ fontSize: 20, fontWeight: 500 }}>Account Settings</Typography>
			<Box mt={4} display={"flex"}>
				<Box>
					<Button
						variant={"contained"}
						color={"secondary"}
						onClick={() => {
							// history.replace({ pathname: "/login" });
							localStorage.removeItem("token");
						}}
					>
						Logout
					</Button>
				</Box>
				<Box ml={4}>
					<Button variant={"contained"} color={"error"} onClick={() => deleteUser()}>
						Delete Account
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Profile;
