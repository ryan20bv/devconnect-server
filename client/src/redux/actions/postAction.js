import axios from "axios";

import {
	GET_ALL_POST,
	POST_ERROR,
	GET_POST,
	CLEAR_POST,
	SET_POST_LOADING,
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

export { getAllPostAction, getPostAction, newPostAction };
