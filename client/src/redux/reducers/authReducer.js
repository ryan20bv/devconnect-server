import { REGISTRATION_SUCCESS, REGISTRATION_FAIL } from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};
console.log("local", localStorage.getItem("token"));
const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case REGISTRATION_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTRATION_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};
		default:
			return state;
	}
};

export default authReducer;
