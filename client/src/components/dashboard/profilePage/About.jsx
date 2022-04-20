import React from "react";

const About = ({ userProfile }) => {
	const { userId, bio, skills } = userProfile;
	return (
		<div className='profile-about bg-light p-2'>
			<h2 className='text-primary'>{userId.name}'s Bio</h2>
			<p>{bio}</p>
			<div className='line'></div>
			<h2 className='text-primary'>Skill Set</h2>
			<div className='skills'>
				{skills.map((skill, index) => (
					<div className='p-1' key={index}>
						<i className='fa fa-check'></i> {skill.toUpperCase()}
					</div>
				))}
			</div>
		</div>
	);
};

export default About;
