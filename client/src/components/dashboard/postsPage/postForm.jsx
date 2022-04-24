import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newPostAction } from "../../../redux/actions/postAction";
import Alert from "../../layout/alert";

const PostForm = ({ newPostAction }) => {
	const [postData, setPostData] = useState({
		text: "",
	});
	const changeHandler = (e) => {
		setPostData({ text: e.target.value });
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		const msg = await newPostAction(postData);
		if (msg === "Success") {
			setPostData({
				text: "",
			});
		}
	};
	return (
		<div className='post-form'>
			<Alert />
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form className='form my-1' onSubmit={(e) => submitHandler(e)}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Create a post'
					onChange={(e) => changeHandler(e)}
					value={postData.text}
					// required
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

PostForm.prototype = {
	newPostAction: PropTypes.func.isRequired,
};

export default connect(null, { newPostAction })(PostForm);
