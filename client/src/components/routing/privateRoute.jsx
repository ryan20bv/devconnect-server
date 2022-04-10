import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
	auth: { isAuthenticated, loading },
	element: Element,
	...rest
}) => (
	<Route
		{...rest}
		// render={(props) =>
		// 	!isAuthenticated && !loading ? (
		// 		<Navigate to='/login' />
		// 	) : (
		// 		<Element {...props} />
		// 	)
		// }
		render={(props) => <Navigate to='/login' />}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		auth: state.authReducer,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
