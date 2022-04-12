import React from "react";
import spinner from "../img/Spin-1s-200px.gif";

const Spinner = () => {
	return (
		<React.Fragment>
			<img
				src={spinner}
				style={{ width: "200px", margin: "15rem auto", display: "block" }}
				alt='Loading...'
			/>
		</React.Fragment>
	);
};

export default Spinner;
