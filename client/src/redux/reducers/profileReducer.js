import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	DELETE_EXPERIENCE,
	DELETE_EDUCATION,
	GET_ALL_PROFILE,
	GET_REPOS,
} from "../actions/types";

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

const profileReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
		case DELETE_EXPERIENCE:
		case DELETE_EDUCATION:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case GET_ALL_PROFILE:
			return {
				...state,
				profiles: payload,
				loading: false,
			};
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case CLEAR_PROFILE:
			return {
				profile: null,
				profiles: [],
				repos: [],
				loading: false,
				error: {},
			};
		default:
			return state;
	}
};

export default profileReducer;
