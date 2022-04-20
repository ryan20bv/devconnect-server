import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfileAction } from "../../redux/actions/profileAction";
import ProfilesItems from "./ProfilesItems";
import Spinner from "../layout/spinner";

const Profiles = ({ getAllProfileAction, profileState }) => {
	const { loading, profiles } = profileState;
	useEffect(() => {
		getAllProfileAction();
	}, [getAllProfileAction]);

	return (
		<React.Fragment>
			{loading || profiles === null ? (
				<Spinner />
			) : (
				<section className='container'>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i> Browse and connect with
						developers
					</p>
					<div className='profiles'>
						<React.Fragment>
							{profiles.length === 0 ? (
								<h1>"No profiles found!"</h1>
							) : (
								<React.Fragment>
									{profiles.map((eachProfile) => (
										<ProfilesItems
											key={eachProfile._id}
											eachProfile={eachProfile}
										/>
									))}
								</React.Fragment>
							)}
						</React.Fragment>
					</div>
				</section>
			)}
		</React.Fragment>
	);
};

Profiles.propTypes = {
	getAllProfileAction: PropTypes.func.isRequired,
	profileState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		profileState: state.profileReducer,
	};
};

export default connect(mapStateToProps, { getAllProfileAction })(Profiles);
