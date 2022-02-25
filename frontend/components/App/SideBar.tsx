import React from "react";

import { useLocation, Link } from "react-router-dom";

import { Avatar, Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SettingsIcon from "@mui/icons-material/Settings";

import { useQuery } from "@apollo/client";
import { GetSideBarProfile } from "../../graphql/query.js";

const useStyles = makeStyles((theme: any) => ({
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6)
	}
}));

const SideBar = (props: any) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
				height: "100%",
				pt: 3,
				pb: 3,
				bgcolor: "primary.light"
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "100%"
				}}
			>
				<MiniProfile />
				<Apps />
			</Box>
			<Settings />
		</Box>
	);
};

const MiniProfile = (props: any) => {
	const classes = useStyles();
	const { loading, error, data } = useQuery(GetSideBarProfile);

	return (
		<Link to={"/app/profile"} className={"no-line"}>
			<Avatar
				alt={"Profile"}
				src={loading || error ? undefined : data.selfLookup.avatar}
				className={classes.avatar}
			/>
		</Link>
	);
};

const Apps = (props: any) => {
	const location = useLocation();
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				mt: 3,
				width: "100%"
			}}
		>
			<NavMenuItem
				page={"Dashboard"}
				active={location.pathname.includes("Dashboard".replace(" ", "-").toLowerCase())}
			/>
			<NavMenuItem
				page={"Satellites"}
				active={location.pathname.includes("Satellites".replace(" ", "-").toLowerCase())}
			/>
		</Box>
	);
};

const NavMenuItem = (props: any) => {
	const classes = useStyles();
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
					mt: 3,
					position: "relative"
				}}
			>
				{props.active && (
					<Box
						bgcolor={"secondary.light"}
						sx={{
							width: 4,
							height: "100%",
							position: "absolute",
							left: 0
						}}
					/>
				)}
				{props.disabled ? (
					<Avatar alt={"Profile"} className={classes.avatar} />
				) : (
					<Link
						to={`/app/${props.page.replace(" ", "-").toLowerCase()}`}
						className={"no-line"}
					>
						<Avatar alt={"Profile"} className={classes.avatar}>
							{props.page.charAt(0)}
						</Avatar>
					</Link>
				)}
			</Box>
		</>
	);
};

const Settings = (props: any) => {
	return (
		<Box>
			<IconButton>
				<SettingsIcon sx={{ fontSize: 28 }} />
			</IconButton>
		</Box>
	);
};

export default SideBar;
