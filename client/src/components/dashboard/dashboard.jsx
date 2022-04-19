/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfileAction } from "../../redux/actions/profileAction.js";
import Spinner from "../layout/spinner.jsx";
import Alert from "../layout/alert";
import DashAction from "./dashAction";
import Profile from "./profile.jsx";
import Experience from "./Experience.jsx";
import Education from "./Education.jsx";
import ModalLayout from "../layout/ModalLayout.jsx";
import { deleteAccountAction } from "../../redux/actions/authAction.js";

const Dashboard = ({
	getCurrentProfileAction,
	authState: { user, isAuthenticated },
	profileState: { profile, loading, error },
	deleteAccountAction,
}) => {
	useEffect(() => {
		getCurrentProfileAction();
	}, []);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const modalHandler = () => {
		setIsModalOpen(true);
	};

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
					<Profile userProfile={profile} />
					{profile.experience.length > 0 && (
						<Experience experience={profile.experience} />
					)}
					{profile.education.length > 0 && (
						<Education education={profile.education} />
					)}
				</React.Fragment>
			)}

			<ModalLayout
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				deleteAccount={deleteAccountAction}
			/>

			<div className='my-2'>
				<button className='btn btn-danger' onClick={() => modalHandler()}>
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
	deleteAccountAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		authState: state.authReducer,
		profileState: state.profileReducer,
	};
};
export default connect(mapStateToProps, {
	getCurrentProfileAction,
	deleteAccountAction,
})(Dashboard);
