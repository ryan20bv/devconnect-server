import React from "react";
import DashAction from "./profilePage/dashAction";
import Main from "./profilePage/Main";
import About from "./profilePage/About";
import Experience from "./profilePage/Experience";
import Education from "./profilePage/Education";

const Profile = ({ userProfile, authUser }) => {
	const { experience, education } = userProfile;
	return (
		<React.Fragment>
			{authUser._id === userProfile.userId._id && <DashAction />}
			{/* <DashAction /> */}

			<div className='profile-grid my-1'>
				<Main userProfile={userProfile} />
				<About userProfile={userProfile} />
			</div>
			{experience.length > 0 && (
				<Experience
					experience={experience}
					authId={authUser._id}
					userProfileId={userProfile.userId._id}
				/>
			)}
			{education.length > 0 && (
				<Education
					education={education}
					authId={authUser._id}
					userProfileId={userProfile.userId._id}
				/>
			)}
		</React.Fragment>
	);
};

export default Profile;
