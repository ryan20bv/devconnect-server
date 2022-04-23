import React from "react";
import DashAction from "./profilePage/dashAction";
import Main from "./profilePage/Main";
import About from "./profilePage/About";
import Experience from "./profilePage/Experience";
import Education from "./profilePage/Education";
import Github from "./profilePage/Github";

const Profile = ({ userProfile, authUser }) => {
	const { experience, education, githubusername } = userProfile;
	const authId = authUser !== null ? authUser._id : "";
	return (
		<React.Fragment>
			{authId === userProfile.userId._id && <DashAction />}
			{/* <DashAction /> */}

			<div className='profile-grid my-1'>
				<Main userProfile={userProfile} />
				<About userProfile={userProfile} />
			</div>
			{experience.length > 0 && (
				<Experience
					experience={experience}
					authId={authId}
					userProfileId={userProfile.userId._id}
				/>
			)}
			{education.length > 0 && (
				<Education
					education={education}
					authId={authId}
					userProfileId={userProfile.userId._id}
				/>
			)}

			<div className='profile-github'>
				<h2 className='text-primary my-1'>
					<i className='fab fa-github'></i> Github Repos
				</h2>
				{githubusername ? (
					<Github githubusername={githubusername} />
				) : (
					<h1>No github profile</h1>
				)}
			</div>
		</React.Fragment>
	);
};

export default Profile;
