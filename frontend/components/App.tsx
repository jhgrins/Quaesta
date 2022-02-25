import { Box, CssBaseline, Typography } from "@mui/material";
import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
	Theme,
	StyledEngineProvider
} from "@mui/material/styles";
import type { Palette } from "@mui/material/styles/createPalette";
import { grey } from "@mui/material/colors";

import { ApolloClient, ApolloProvider, InMemoryCache, from, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";

import { setContext } from "@apollo/client/link/context";

import WebSocketLink from "./WebSocketLink";
import Router from "./Router";

import Logo from "../static/images/logo.png";

/* eslint-disable no-unused-vars */
declare module "@mui/styles/defaultTheme" {
	interface DefaultTheme extends Theme {}
}

declare module "@mui/material/styles/createPalette" {
	interface PaletteOptions {
		neutral?: {
			main: Palette["primary"]["main"];
			light: Palette["primary"]["main"];
			medium: Palette["primary"]["main"];
			mediumDark: Palette["primary"]["main"];
			dark: Palette["primary"]["main"];
		};
	}
}
/* eslint-enable no-unused-vars */

const App = () => {
	let theme = createTheme({
		palette: {
			mode: "light",
			primary: { light: "#64CFF7", main: "#CA7CD8", dark: "#3968CB" },
			secondary: { light: "#F7E752", main: "#FF68A8" },
			neutral: {
				main: "#FFFFFF",
				light: grey[100],
				medium: grey[200],
				mediumDark: grey[300],
				dark: grey[600]
			}
		}
	});
	theme = responsiveFontSizes(theme);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box sx={{ display: { xs: "none", md: "block" } }}>
					<FullApp />
				</Box>
				<Box sx={{ display: { xs: "block", md: "none" } }}>
					<MobileApp />
				</Box>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

const FullApp = () => {
	const httpLink = new HttpLink({
		uri: process.env.GRAPHQL_ENDPOINT || "http://localhost:8000/dev/graphql",
		credentials: "same-origin"
	});

	const authLink = setContext((_, { headers }) => {
		const token = localStorage.getItem("token");
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ""
			}
		};
	});

	const wsLink = new WebSocketLink({
		url: process.env.WEBSOCKET_ENDPOINT || "ws://localhost:8001",
		connectionParams: () => {
			const token = localStorage.getItem("token");
			return {
				Authorization: token ? `Bearer ${token}` : ""
			};
		}
	});

	const errorLink = onError(({ graphQLErrors }) => {
		if (graphQLErrors) {
			if (
				graphQLErrors
					.map((error: any) => error.extensions.code)
					.includes("INTERNAL_SERVER_ERROR")
			) {
				graphQLErrors.forEach((error) => {
					if (!error.message) console.error(`An Unknown Error Has Occurred`);
					console.error(`Error: ${error.message}. Operation: ${error.path}`);
				});
			} else if (
				graphQLErrors.map((error: any) => error.extensions.code).includes("UNAUTHENTICATED")
			) {
				window.location.href = "/login";
			}
		}
	});

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === "OperationDefinition" && definition.operation === "subscription"
			);
		},
		wsLink,
		authLink.concat(httpLink)
	);

	const additiveLink = from([errorLink, splitLink]);

	const client = new ApolloClient({
		link: additiveLink,
		cache: new InMemoryCache()
	});

	return (
		<ApolloProvider client={client}>
			<Router />
		</ApolloProvider>
	);
};

const MobileApp = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh"
			}}
		>
			<img alt={"Hypergate Logo"} src={Logo} style={{ height: 80 }} />
			<Box
				sx={{
					p: 4,
					pt: 6,
					pl: 10,
					pr: 10,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center"
				}}
			>
				<Typography variant={"h2"} align={"center"} style={{ fontWeight: 600 }}>
					Welcome To Quaesta
				</Typography>
				<Box sx={{ pt: 4 }}>
					<Typography align={"center"} style={{ fontWeight: 400, fontSize: 17 }}>
						{"A Portal For Gamers"}
					</Typography>
				</Box>
				<Box sx={{ pt: 8 }}>
					<Typography align={"center"} style={{ fontWeight: 400, fontSize: 15 }}>
						Visit us on your desktop at
					</Typography>
					<Typography align={"center"} style={{ fontWeight: 400, fontSize: 15 }}>
						<a href={"https://quaesta.dev"}>quaesta.dev</a>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default App;
