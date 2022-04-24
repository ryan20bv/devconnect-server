import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostsByUserAction } from "../../../redux/actions/postAction";
import PostsItem from "./postsItem";
import PostForm from "./postForm";
import Spinner from "../../layout/spinner";

const MyPost = ({ getPostsByUserAction, authState, postState }) => {
	const { posts, loading } = postState;
	const { isAuthenticated, user } = authState;
	const navigate = useNavigate();
	useEffect(() => {
		isAuthenticated && getPostsByUserAction(user._id);
	}, [getPostsByUserAction]);

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		<section className='container'>
			<h1 className='large text-primary'>My Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome {user.name}!
			</p>
			<button className='btn btn-primary my-1' onClick={() => navigate(-1)}>
				Go back
			</button>
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

MyPost.propTypes = {};

const mapStateToProps = (state) => {
	return {
		authState: state.authReducer,
		postState: state.postReducer,
	};
};

export default connect(mapStateToProps, { getPostsByUserAction })(MyPost);
