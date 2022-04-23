import React from "react";
import Social from "./Social";

const Main = ({ userProfile }) => {
	const { userId, location, status, social, website } = userProfile;
	return (
		<div className='profile-top bg-primary p-2'>
			<img className='round-img my-1' src={userId.avatar} alt='' />
			<h1 className='large'>{userId.name}</h1>
			<p className='lead'>{status}</p>
			<p>{location}</p>
			{social && <Social social={social} website={website} />}
		</div>
	);
};

export default Main;
