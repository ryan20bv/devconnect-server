import axios from "axios";

import {
	GET_ALL_POST,
	POST_ERROR,
	GET_POST,
	CLEAR_POST,
	SET_POST_LOADING,
	UPDATE_POST,
	CLEAR_POSTS,
	GET_MY_POST,
} from "../actions/types";

import { setAlertAction } from "./alertAction";

const getAllPostAction = () => async (dispatch) => {
	dispatch({ type: CLEAR_POST });
	try {
		const res = await axios.get("http://localhost:5000/api/posts/");
		dispatch({
			type: GET_ALL_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err?.response.data.error.msg,
				status: err.response.status,
			},
		});
	}
};

const getPostsByUserAction = (userId) => async (dispatch) => {
	dispatch({ type: CLEAR_POSTS });
	try {
		const res = await axios.get(
			`http://localhost:5000/api/posts/user/${userId}`
		);
		dispatch({
			type: GET_MY_POST,
			payload: res.data.mypost,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err?.response.data.error.msg,
				status: err.response.status,
			},
		});
	}
};

const getPostAction = (postId) => async (dispatch) => {
	dispatch({ type: SET_POST_LOADING });
	try {
		const res = await axios.get(
			`http://localhost:5000/api/posts/post/${postId}`
		);
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err?.response.data.error.msg,
				status: err.response.status,
			},
		});
	}
};

const newPostAction = (postData) => async (dispatch) => {
	try {
		const res = await axios.post(
			"http://localhost:5000/api/posts/newpost",
			postData
		);
		dispatch(getAllPostAction());
		dispatch(setAlertAction(res.data.msg, "success"));
		return res.data.msg;
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((element) => {
				dispatch(setAlertAction(element.msg, "danger"));
			});
		}
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.data.errors,
				status: err.response.status,
			},
		});
	}
};

const newCommentAction = (commentData, postId) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/posts/comment/${postId}`,
			commentData
		);
		dispatch({ type: UPDATE_POST, payload: res.data.post });
		dispatch(setAlertAction(res.data.msg, "success"));
		return res.data.msg;
	} catch (err) {
		console.log(err.response.data);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((element) => {
				dispatch(setAlertAction(element.msg, "danger"));
			});
		}
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.data.errors,
				status: err.response.status,
			},
		});
	}
};
const deleteCommentAction = (commentId, postId) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/posts/comment/${postId}/delete/${commentId}`
		);
		// dispatch(getPostAction(postId));
		dispatch({
			type: UPDATE_POST,
			payload: res.data.post,
		});
		dispatch(setAlertAction(res.data.msg, "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.data.errors,
				status: err.response.status,
			},
		});
	}
};

const deletePostAction = (postId) => async (dispatch) => {
	// dispatch({ type: CLEAR_POSTS });
	try {
		const res = await axios.delete(
			`http://localhost:5000/api/posts/delete/${postId}`
		);
		// dispatch(getPostAction(postId));
		dispatch(getAllPostAction());
		dispatch(setAlertAction(res.data.msg, "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.data.errors,
				status: err.response.status,
			},
		});
	}
};

export {
	getAllPostAction,
	getPostAction,
	newPostAction,
	newCommentAction,
	deleteCommentAction,
	deletePostAction,
	getPostsByUserAction,
};
