import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	deletePostAction,
	likePostAction,
	unlikePostAction,
} from "../../../redux/actions/postAction";

const PostsItem = ({
	post,
	authUserId,
	deletePostAction,
	likePostAction,
	unlikePostAction,
}) => {
	const formattedDate = <Moment format='D MMM YYYY'>{post.date}</Moment>;

	const found = post.likes.find((like) => like.userId === authUserId);

	const deletePostHandler = (postId) => {
		deletePostAction(postId);
	};

	const likeHandler = (postId) => {
		likePostAction(postId);
	};
	const unlikeHandler = (postId) => {
		unlikePostAction(postId);
	};
	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<a href='profile.html'>
					<img className='round-img' src={post.avatar} alt='' />
					<h4>{post.name}</h4>
				</a>
			</div>
			<div>
				<p className='my-1'>{post.text}</p>
				<p className='post-date'>Posted on {formattedDate}</p>
				<button
					type='button'
					className='btn btn-light'
					onClick={() => likeHandler(post._id)}
				>
					<i className='fas fa-thumbs-up'></i> <span>{post.likes.length}</span>
				</button>
				{found && (
					<button
						type='button'
						className='btn btn-light'
						onClick={() => unlikeHandler(post._id)}
					>
						<i className='fas fa-thumbs-down'></i>
					</button>
				)}

				<Link to={`/post/${post._id}`} className='btn btn-primary'>
					Discussion{" "}
					<span className='comment-count'>{post.comments.length}</span>
				</Link>
				{authUserId === post.userId && (
					<button
						type='button'
						className='btn btn-danger'
						onClick={() => deletePostHandler(post._id)}
					>
						<i className='fas fa-times'></i>
					</button>
				)}
			</div>
		</div>
	);
};

export default connect(null, {
	deletePostAction,
	likePostAction,
	unlikePostAction,
})(PostsItem);
