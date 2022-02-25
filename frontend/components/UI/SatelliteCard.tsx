import { Link } from "react-router-dom";

import { Box, Paper, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
	hoverPaper: {
		cursor: "pointer",
		borderRadius: "20px",
		"&:hover": {
			boxShadow:
				"0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)"
		}
	}
}));

const SatelliteCard = (props: any) => {
	const classes = useStyles();
	return (
		<Link to={"/app/satellites/" + props.satellite.id} className={"no-line"}>
			<Paper
				elevation={0}
				className={classes.hoverPaper}
				sx={{ width: 280, height: 250, p: 3 }}
			>
				<Box display={"flex"} flexDirection={"column"}>
					<Typography style={{ fontSize: 18, fontWeight: 500 }}>
						{props.satellite.name}
					</Typography>
				</Box>
			</Paper>
		</Link>
	);
};

export default SatelliteCard;