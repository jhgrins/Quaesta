import { useLocation, Link } from "react-router-dom";

import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SettingsIcon from "@mui/icons-material/Settings";

import { useQuery } from "@apollo/client";
import { GetSideBarProfile } from "../../graphql/query";

const useStyles = makeStyles((theme: any) => ({
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6)
	}
}));

const NavBar = () => {
	return (
		<Box
			sx={{ display: "flex", justifyContent: "space-between", alignContent: "center", p: 2 }}
		>
			<Navigation />
			<NavProfile />
		</Box>
	);
};

const Navigation = () => {
	const links = [{ name: "Home", to: "/app" }];
	return (
		<Box sx={{ display: "flex", alignContent: "center", pl: 2 }}>
			{links.map((link) => (
				<Link to={link.to}>
					<Typography variant={"h6"}>{link.name}</Typography>
				</Link>
			))}
		</Box>
	);
};

const NavProfile = () => {
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

export default NavBar;
