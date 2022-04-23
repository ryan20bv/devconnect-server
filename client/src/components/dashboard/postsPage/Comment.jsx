import React from "react";
import Moment from "react-moment";

const Comment = ({ comment }) => {
	const formattedDate = <Moment format='D MMM YYYY'>{comment.date}</Moment>;
	return (
		<React.Fragment>
			<div className='post bg-white p-1 my-1'>
				<div>
					<a href='profile.html'>
						<img className='round-img' src={comment.avatar} alt='' />
						<h4>{comment.name}</h4>
					</a>
				</div>
				<div>
					<p className='my-1'>{comment.text}</p>
					<p className='post-date'>Posted on {formattedDate}</p>
					<button type='button' className='btn btn-danger'>
						<i className='fas fa-times'></i>
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Comment;
