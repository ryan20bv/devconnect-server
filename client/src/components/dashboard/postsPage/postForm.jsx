import React from "react";

const PostForm = () => {
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form className='form my-1'>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Create a post'
					required
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

export default PostForm;
