import {
	GET_ALL_POST,
	POST_ERROR,
	GET_POST,
	CLEAR_POST,
	SET_POST_LOADING,
	UPDATE_POST,
	CLEAR_POSTS,
	GET_MY_POST,
	UPDATE_LIKE,
	DELETE_POST,
	ADD_NEW_POST,
} from "../actions/types";

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

const postReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_POST_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_ALL_POST:
		case GET_MY_POST:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case ADD_NEW_POST:
			return {
				...state,
				posts: [payload.post, ...state.posts],
				loading: false,
			};
		case GET_POST:
		case UPDATE_POST:
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
		case CLEAR_POST:
			return {
				...state,
				post: null,
				loading: false,
			};
		case CLEAR_POSTS:
			return {
				...state,
				posts: [],
				post: null,
				loading: false,
			};
		case UPDATE_LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId
						? { ...post, likes: payload.post.likes }
						: post
				),
				loading: false,
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload.post._id),
				loading: false,
			};
		default:
			return state;
	}
};

export default postReducer;
