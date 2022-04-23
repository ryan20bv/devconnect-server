import { GET_ALL_POST, POST_ERROR, GET_POST } from "../actions/types";

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

const postReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_ALL_POST:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false,
			};
		case POST_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export default postReducer;
