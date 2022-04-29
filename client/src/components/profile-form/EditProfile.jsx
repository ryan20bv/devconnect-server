// rafcp
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
	getCurrentProfileAction,
	createProfileAction,
} from "../../redux/actions/profileAction.js";
import Alert from "../layout/alert";
import { setAlertAction } from "../../redux/actions/alertAction";

const EditProfile = ({
	authState: { isAuthenticated },
	profileState: { profile, loading },
	createProfileAction,
	setAlertAction,
}) => {
	const [socialMedia, setSocialMedia] = useState(false);
	const [hasChanged, setHasChanged] = useState(false);
	const [profileData, setProfileData] = useState({
		status: "",
		company: "",
		website: "",
		location: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: "",
	});

	useEffect(() => {
		getCurrentProfileAction();
		setProfileData({
			status: loading || !profile.status ? "" : profile.status,
			company: loading || !profile.company ? "" : profile.company,
			website: loading || !profile.website ? "" : profile.website,
			location: loading || !profile.location ? "" : profile.location,
			skills: loading || !profile.skills ? "" : profile.skills.join(","),
			githubusername:
				loading || !profile.githubusername ? "" : profile.githubusername,
			bio: loading || !profile.bio ? "" : profile.bio,
			twitter: loading || !profile.social.twitter ? "" : profile.social.twitter,
			facebook:
				loading || !profile.social.facebook ? "" : profile.social.facebook,
			linkedin:
				loading || !profile.social.linkedin ? "" : profile.social.linkedin,
			youtube: loading || !profile.social.youtube ? "" : profile.social.youtube,
			instagram:
				loading || !profile.social.instagram ? "" : profile.social.instagram,
		});
	}, [loading, getCurrentProfileAction]);

	const changeHandler = (e) => {
		setProfileData({ ...profileData, [e.target.name]: e.target.value });
		if (!hasChanged) {
			setHasChanged(true);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		if (hasChanged) {
			await createProfileAction(profileData, true);
		} else {
			setAlertAction("nothing has been changed", "dark");
		}
		setHasChanged(false);
	};

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}
	return (
		<section className='container'>
			<h1 className='large text-primary'>Edit Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Let's get some information to make your
				profile stand out
			</p>
			<small>* required field</small>
			<form className='form' onSubmit={(e) => submitHandler(e)}>
				<Alert />
				<div className='form-group'>
					<small className='form-text'>
						* Give us an idea of where you are at in your career
					</small>
					<select
						required
						name='status'
						onChange={(e) => changeHandler(e)}
						value={profileData.status}
					>
						<option value='0'>* Select Professional Status</option>
						<option value='Developer'>Developer</option>
						<option value='Junior Developer'>Junior Developer</option>
						<option value='Senior Developer'>Senior Developer</option>
						<option value='Manager'>Manager</option>
						<option value='Student or Learning'>Student or Learning</option>
						<option value='Instructor'>Instructor or Teacher</option>
						<option value='Intern'>Intern</option>
						<option value='Other'>Other</option>
					</select>
				</div>
				<div className='form-group'>
					<small className='form-text'>
						Could be your own company or one you work for
					</small>
					<input
						type='text'
						placeholder='Company'
						name='company'
						onChange={(e) => changeHandler(e)}
						value={profileData.company}
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>
						Could be your own or a company website
					</small>
					<input
						type='text'
						placeholder='Website'
						name='website'
						onChange={(e) => changeHandler(e)}
						value={profileData.website}
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>
						City & state suggested (eg. Boston, MA)
					</small>
					<input
						type='text'
						placeholder='Location'
						name='location'
						onChange={(e) => changeHandler(e)}
						value={profileData.location}
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>
						* Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
					</small>
					<input
						type='text'
						placeholder='* Skills'
						name='skills'
						onChange={(e) => changeHandler(e)}
						value={profileData.skills}
						required
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>
						If you want your latest repos and a Github link, include your
						username
					</small>
					<input
						type='text'
						placeholder='Github Username'
						name='githubusername'
						onChange={(e) => changeHandler(e)}
						value={profileData.githubusername}
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>Tell us a little about yourself</small>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						onChange={(e) => changeHandler(e)}
						value={profileData.bio}
					></textarea>
				</div>

				<div className='my-2'>
					<button
						onClick={() => setSocialMedia(!socialMedia)}
						type='button'
						className='btn btn-primary'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{socialMedia && (
					<React.Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x'></i>
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								onChange={(e) => changeHandler(e)}
								value={profileData.twitter}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x'></i>
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								onChange={(e) => changeHandler(e)}
								value={profileData.facebook}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x'></i>
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								onChange={(e) => changeHandler(e)}
								value={profileData.youtube}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x'></i>
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								onChange={(e) => changeHandler(e)}
								value={profileData.linkedin}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x'></i>
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								onChange={(e) => changeHandler(e)}
								value={profileData.instagram}
							/>
						</div>
					</React.Fragment>
				)}
				<input type='submit' className='btn btn-primary my-1' value='Submit' />
				<Link to='/dashboard' className='btn btn-light my-1'>
					Go Back
				</Link>
			</form>
		</section>
	);
};

EditProfile.propTypes = {
	getCurrentProfileAction: PropTypes.func.isRequired,
	createProfileAction: PropTypes.func.isRequired,
	authState: PropTypes.object.isRequired,
	profileState: PropTypes.object.isRequired,
	setAlertAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		authState: state.authReducer,
		profileState: state.profileReducer,
	};
};

export default connect(mapStateToProps, {
	getCurrentProfileAction,
	createProfileAction,
	setAlertAction,
})(EditProfile);
