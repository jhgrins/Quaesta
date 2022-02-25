import { Link } from "react-router-dom";

import Image from "../../static/images/logo.png";

const Logo = (props: any) => {
	return (
		<Link to={"/"}>
			<img
				alt={"Quaesta Logo"}
				src={Image}
				style={{ height: props.height }}
			/>
		</Link>
	);
};

export default Logo;
