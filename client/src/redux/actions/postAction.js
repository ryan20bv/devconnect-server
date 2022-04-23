import axios from "axios";

import { GET_ALL_POST, POST_ERROR, GET_POST } from "../actions/types";

const getAllPostAction = () => async (dispatch) => {
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

export { getAllPostAction, getPostAction };
