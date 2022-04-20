import React from "react";

const Social = ({ social }) => {
	return (
		<React.Fragment>
			<div className='icons my-1'>
				{social.globe && (
					<a href={social.globe} target='_blank' rel='noopener noreferrer'>
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
					<a href={social.instagram} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-instagram fa-2x'></i>
					</a>
				)}
			</div>
		</React.Fragment>
	);
};

export default Social;
