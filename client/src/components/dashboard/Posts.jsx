import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import PostForm from "./postsPage/postForm";
import PostsItem from "./postsPage/postsItem";
import { connect } from "react-redux";
import { getAllPostAction } from "../../redux/actions/postAction";

const Posts = ({ getAllPostAction, postState, authState }) => {
	useEffect(() => {
		getAllPostAction();
	}, [getAllPostAction]);
	const { posts, loading } = postState;
	const { isAuthenticated, user } = authState;

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}
	return (
		<section className='container'>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome to the community!
			</p>

			<PostForm />

			{posts.length > 0 ? (
				<div className='posts'>
					{posts.map((post) => (
						<PostsItem key={post._id} post={post} authUserId={user._id} />
					))}
				</div>
			) : (
				<React.Fragment>
					<h1>No Posts</h1>
				</React.Fragment>
			)}
		</section>
	);
};

Posts.propTypes = {
	getAllPostAction: PropTypes.func.isRequired,
	postState: PropTypes.object.isRequired,
	authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		postState: state.postReducer,
		authState: state.authReducer,
	};
};
export default connect(mapStateToProps, { getAllPostAction })(Posts);
