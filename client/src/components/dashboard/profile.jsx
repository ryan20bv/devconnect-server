import React from "react";

const Profile = ({ userProfile }) => {
	const { userId, location, status, social, bio, skills } = userProfile;
	return (
		<div className='profile-grid my-1'>
			{/* <!-- Top --> */}
			<div className='profile-top bg-primary p-2'>
				<img className='round-img my-1' src={userId.avatar} alt='' />
				<h1 className='large'>{userId.name}</h1>
				<p className='lead'>{status}</p>
				<p>{location}</p>
				<div className='icons my-1'>
					{social.globe && (
						<a href='#' target='_blank' rel='noopener noreferrer'>
							<i className='fas fa-globe fa-2x'></i>
						</a>
					)}
					{social.twitter && (
						<a href={social.twitter} target='_blank' rel='noopener noreferrer'>
							<i className='fab fa-twitter fa-2x'></i>
						</a>
					)}

					{social.facebook && (
						<a href={social.facebook} target='_blank' rel='noopener noreferrer'>
							<i className='fab fa-facebook fa-2x'></i>
						</a>
					)}

					{social.linkedin && (
						<a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
							<i className='fab fa-linkedin fa-2x'></i>
						</a>
					)}

					{social.youtube && (
						<a href={social.youtube} target='_blank' rel='noopener noreferrer'>
							<i className='fab fa-youtube fa-2x'></i>
						</a>
					)}

					{social.instagram && (
						<a
							href={social.instagram}
							target='_blank'
							rel='noopener noreferrer'
						>
							<i className='fab fa-instagram fa-2x'></i>
						</a>
					)}
				</div>
			</div>
			{/* <!-- About --> */}
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
		</div>
	);
};

export default Profile;
