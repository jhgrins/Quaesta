import { useEffect } from "react";

import { BrowserRouter, Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";

import LoginLayout from "./Login/Layout";
import CreateAccount from "./Login/CreateAccount";
import FinalizeAccount from "./Login/FinalizeAccount";
import Login from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";

import AppLayout from "./App/Layout";

import DashBoard from "./App/Pages/Dashboard";
import Game from "./App/Game/Game";
import Profile from "./App/Pages/Profile";
import NotFound from "./NotFound";

const Router = () => {
	return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Router404Inject />}>
                    <Route element={<LoginLayout />}>
                        <Route index element={<Login />} />
                        <Route path={"create-account"} element={<CreateAccount />} />
                        <Route path={"login"} element={<Login />} />
                        <Route path={"finalize-account"} element={<FinalizeAccount />} />
                        <Route path={"forgot-password"} element={<ForgotPassword />} />
                        <Route path={"forgot-password/:authToken"} element={<ForgotPassword />} />
                    </Route>
                    <Route path={"/app"} element={<AppLayout />}>
                        <Route index element={<DashBoard />} />
                        <Route path={"profile"} element={<Profile />} />
                        <Route path={"dashboard"} element={<DashBoard />} />
                        <Route path={"game/:gameId"} element={<Game />} />
                    </Route>
                    <Route path={"*"} element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

const Router404Inject = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const splitPath = location.search.split("/");
		if (splitPath[0] === "?") {
			navigate(splitPath[1]);
		}
	}, [location]);

	return <Outlet />;
};

export default Router;
