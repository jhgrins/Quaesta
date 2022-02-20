import React from "react";

import { Box, Skeleton, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
// import { GetSatellitesOverview } from "../../../graphql/query.js";

import SatelliteCard from "../../UI/SatelliteCard";

const DashBoard = (props) => {
	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Typography sx={{ fontSize: 40, fontWeight: 500 }}>Dashboard</Typography>
			<Box mt={4} flexGrow={1} minHeight={500} className={"verticalScrollDiv"}>
				<Satellites />
			</Box>
		</Box>
	);
};

const Satellites = (props) => {
	const GetSatellitesOverview: any = null;
	const { loading, error, data } = useQuery(GetSatellitesOverview);
	return (
		<Box height={"100%"} display={"flex"} flexDirection={"column"}>
			<Typography sx={{ fontSize: 20, fontWeight: 500 }}>Satellites</Typography>
			<Box
				mt={2}
				p={1}
				display={"flex"}
				flexDirection={"row"}
				flexWrap={"nowrap"}
				className={"horizontalScrollArea"}
			>
				{loading || error
					? Array.from(Array(3)).map((_, index) => (
							<Box key={index} mr={4}>
								<Skeleton width={280} height={250} />
							</Box>
					  ))
					: data.selfLookup.satellites.map((satellite) => (
							<Box key={satellite.id} mr={4}>
								<SatelliteCard satellite={satellite} />
							</Box>
					  ))}
			</Box>
		</Box>
	);
};

export default DashBoard;
