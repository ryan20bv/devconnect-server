import React, { useEffect } from "react";
import Moment from "react-moment";
import { Link, useParams, Navigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { connect } from "react-redux";
import { getPostAction } from "../../../redux/actions/postAction";
import Spinner from "../../layout/spinner";

const Post = ({ getPostAction, postState, authState }) => {
	useEffect(() => {
		getPostAction(postId);
	}, [getPostAction]);
	const { postId } = useParams();
	const { isAuthenticated, user } = authState;
	const { loading, post } = postState;

	// const { name, avatar, text, date, comments } = post;

	const formattedDate = <Moment format='D MMM YYYY'>{post?.date}</Moment>;

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		<section className='container'>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
			<div className='post bg-white p-1 my-1'>
				<div>
					<a href='profile.html'>
						<img className='round-img' src={post?.avatar} alt='' />
						<h4>{post?.name}</h4>
					</a>
				</div>
				<div>
					<p className='my-1'>{post?.text}</p>
					<p className='post-date'>Posted on {formattedDate}</p>
					<button className='btn btn-danger'>Delete</button>
				</div>
			</div>
			<CommentForm />
			{post?.comments.length > 0 ? (
				<div className='comments'>
					{post?.comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</div>
			) : (
				<React.Fragment>
					<h1>No Comments!</h1>
				</React.Fragment>
			)}
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		postState: state.postReducer,
		authState: state.authReducer,
	};
};
export default connect(mapStateToProps, { getPostAction })(Post);
