import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileByUserIdAction } from "../../redux/actions/profileAction";
import Spinner from "../layout/spinner";
import Profile from "./profile";

const DevProfile = ({ getProfileByUserIdAction, profileState, authState }) => {
	const { userId } = useParams();
	useEffect(() => {
		getProfileByUserIdAction(userId);
	}, [userId]);
	const { loading, profile } = profileState;
	const { user } = authState;
	return (
		<section className='container'>
			{loading || profile === null ? (
				<Spinner />
			) : (
				<React.Fragment>
					<Profile userProfile={profile} authUser={user} />
				</React.Fragment>
			)}
		</section>
	);
};

DevProfile.propTypes = {
	getProfileByUserIdAction: PropTypes.func.isRequired,
	profileState: PropTypes.object.isRequired,
	authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		profileState: state.profileReducer,
		authState: state.authReducer,
	};
};

export default connect(mapStateToProps, { getProfileByUserIdAction })(
	DevProfile
);
