import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newCommentAction } from "../../../redux/actions/postAction.js";
import Alert from "../../layout/alert";

const CommentForm = ({ newCommentAction, postsState }) => {
	const [commentData, setCommentData] = useState({
		text: "",
	});

	const changeHandler = (e) => {
		setCommentData({ text: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const msg = await newCommentAction(commentData, postsState.post._id);
		if (msg === "Success") {
			setCommentData({
				text: "",
			});
		}
	};

	return (
		<div className='post-form'>
			<Alert />
			<div className='bg-primary p'>
				<h3>Leave A Comment</h3>
			</div>
			<form className='form my-1' onSubmit={(e) => submitHandler(e)}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Comment on this post'
					onChange={(e) => changeHandler(e)}
					value={commentData.text}
					// required
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	newCommentAction: PropTypes.func.isRequired,
	postsState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		postsState: state.postReducer,
	};
};

export default connect(mapStateToProps, { newCommentAction })(CommentForm);
