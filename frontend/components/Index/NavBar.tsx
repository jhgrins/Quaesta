import { Link } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";

import Logo from "../UI/Logo";
import { HomePageSmallButton } from "../UI/Buttons";

const NavBar = () => {
	return (
        <Box pl={8} pr={8} ml={8} mr={8}>
			<Grid container justifyContent={"space-between"} alignItems={"center"}>
				<Grid item>
					<LogoHeader />
				</Grid>
				<Grid item>
					<NavLinks />
				</Grid>
				<Grid item>
					<Link to={"/login"}>
						<HomePageSmallButton variant="contained">Login</HomePageSmallButton>
					</Link>
				</Grid>
			</Grid>
		</Box>
    );
};

const LogoHeader = () => {
	return (
        <Box p={2}>
			<Grid item container justifyContent={"center"} alignItems={"center"}>
				<Grid item>
					<Logo height={50} />
				</Grid>
			</Grid>
		</Box>
    );
};

const NavLinks = () => {
	return (
        <Box p={2}>
			<Grid container spacing={6} justifyContent={"center"}>
				<Grid item>
					<a href="#download">
						<Typography variant={"h6"} style={{ color: "#FFFFFF" }}>
							Download
						</Typography>
					</a>
				</Grid>
				<Grid item>
					<a href="#overview">
						<Typography variant={"h6"} style={{ color: "#FFFFFF" }}>
							Overview
						</Typography>
					</a>
				</Grid>
				<Grid item>
					<a href="#more">
						<Typography variant={"h6"} style={{ color: "#FFFFFF" }}>
							More
						</Typography>
					</a>
				</Grid>
			</Grid>
		</Box>
    );
};

export default NavBar;
