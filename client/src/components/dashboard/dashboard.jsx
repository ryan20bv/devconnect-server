/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfileAction } from "../../redux/actions/profileAction.js";
import Spinner from "../layout/spinner.jsx";
import Alert from "../layout/alert";
import DashAction from "./dashAction";

const Dashboard = ({
	getCurrentProfileAction,
	authState: { user, isAuthenticated },
	profileState: { profile, loading, error },
}) => {
	useEffect(() => {
		getCurrentProfileAction();
	}, []);

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}
	return loading && profile === null ? (
		<Spinner />
	) : (
		<section className='container'>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome {user && user.name}
			</p>
			<Alert />
			{/* for profile */}
			{loading || profile === null ? (
				<React.Fragment>
					<p>{error.msg}</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</React.Fragment>
			) : (
				<React.Fragment>
					<DashAction />
				</React.Fragment>
			)}

			<div className='my-2'>
				<button className='btn btn-danger'>
					<i className='fas fa-user-minus'></i>
					Delete My Account
				</button>
			</div>
		</section>
	);
};

Dashboard.propTypes = {
	getCurrentProfileAction: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
	profileState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		authState: state.authReducer,
		profileState: state.profileReducer,
	};
};
export default connect(mapStateToProps, {
	getCurrentProfileAction,
})(Dashboard);
