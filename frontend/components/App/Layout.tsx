import { useState } from "react";

import { useNavigate, Navigate, Outlet, useLocation } from "react-router-dom";

import { Box, Paper, TextField, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

import NavBar from "./NavBar";

const Layout = (props: any) => {
	return (
		<Box width={"100vw"} minHeight={"100vh"} display={"flex"} flexDirection={"column"}>
			<Box minHeight={80} sx={{ bgcolor: grey[200] }}>
				<NavBar {...props} />
			</Box>
			<Box flexGrow={1} p={6} bgcolor={"neutral.light"} className={"app"}>
				<ProtectedRoute>
					<Outlet />
				</ProtectedRoute>
			</Box>
		</Box>
	);
};

const ProtectedRoute = (props: any) => {
	const location = useLocation();

	if (localStorage.getItem("token")) {
		return props.children;
	}

	return <Navigate to={"/login"} state={{ from: location }} />;
};

const Notifications = () => {
	return (
		<Paper elevation={0} sx={{ width: 40, height: 40, borderRadius: 20 }}>
			<Box
				width={"100%"}
				height={"100%"}
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<NotificationsIcon color={"action"} sx={{ fontSize: 18 }} />
			</Box>
		</Paper>
	);
};

const Search = () => {
	const [searchText, setSearchText] = useState("");
	const navigate = useNavigate();
	const onChangeHandler = (event: any) => {
		if (event && event.target.value) {
			setSearchText(event.target.value);
		}
	};
	const onSubmit = () => {
		navigate("/app/game/" + searchText);
	};
	return (
		<Paper elevation={0} sx={{ ml: 2, p: 1, pl: 2, width: 300, height: 60, borderRadius: 20 }}>
			<TextField
				label="Search"
				variant="standard"
				color="primary"
				onChange={onChangeHandler}
				size="small"
			/>
			<IconButton onClick={onSubmit}>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default Layout;
