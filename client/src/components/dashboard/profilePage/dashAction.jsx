import React from "react";
import { Link } from "react-router-dom";

function DashAction() {
	return (
		<div className='dash-buttons'>
			<Link to='/edit-profile' className='btn btn-light'>
				<i className='fas fa-user-circle text-primary'></i> Edit Profile
			</Link>
			<Link to='/add-experience' className='btn btn-light'>
				<i className='fab fa-black-tie text-primary'></i> Add Experience
			</Link>
			<Link to='/add-education' className='btn btn-light'>
				<i className='fas fa-graduation-cap text-primary'></i> Add Education
			</Link>
			<Link to='/mypost' className='btn btn-light'>
				<i className='fas fa-solid fa-signs-post text-primary'></i> My Post
			</Link>
		</div>
	);
}

export default DashAction;
{
	/* <i class='fa-solid fa-signs-post'></i>; */
}
