import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfilesItems = ({ eachProfile }) => {
	return (
		<div className='profile bg-light'>
			<img className='round-img' src={eachProfile.userId.avatar} alt='' />
			<div>
				<h2>{eachProfile.userId.name}</h2>
				<p>
					{eachProfile.status}{" "}
					{eachProfile.company && `at ${eachProfile.company}`}
				</p>
				<p>{eachProfile.location && eachProfile.location}</p>
				<Link
					to={`/devprofile/${eachProfile.userId._id}`}
					className='btn btn-primary'
				>
					View Profile
				</Link>
			</div>

			<ul>
				{eachProfile.skills.slice(0, 4).map((skill, index) => {
					return (
						<li className='text-primary' key={index}>
							<i className='fas fa-check'></i> {skill}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

ProfilesItems.propTypes = {
	eachProfile: PropTypes.object.isRequired,
};

export default ProfilesItems;
