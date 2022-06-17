import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

import NavBar from "./NavBar";

const Layout = (props: any) => {
	return (
		<Box width={"100vw"} minHeight={"100vh"} display={"flex"} flexDirection={"column"}>
			<Box sx={{ bgcolor: grey[200] }}>
				<NavBar {...props} />
			</Box>
			<Box flexGrow={1} p={4} bgcolor={"neutral.light"} className={"app"}>
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

export default Layout;
