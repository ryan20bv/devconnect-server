import React from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCommentAction } from "../../../redux/actions/postAction";

const Comment = ({ comment, authUserId, deleteCommentAction }) => {
	const formattedDate = <Moment format='D MMM YYYY'>{comment.date}</Moment>;
	const { postId } = useParams();
	const deleteHandler = (commentId) => {
		deleteCommentAction(commentId, postId);
	};
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
					{authUserId === comment.userId && (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => deleteHandler(comment._id)}
						>
							<i className='fas fa-times'></i>
						</button>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default connect(null, { deleteCommentAction })(Comment);
