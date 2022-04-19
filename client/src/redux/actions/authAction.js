import {
	REGISTRATION_SUCCESS,
	REGISTRATION_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
	DELETE_ACCOUNT,
	PROFILE_ERROR,
} from "./types";
import axios from "axios";
import { setAlertAction } from "./alertAction";
import authToken from "../../utilities/authToken";

// Load User
const loadUserAction = () => async (dispatch) => {
	if (localStorage.token) {
		authToken(localStorage.token);
	}
	try {
		const res = await axios.get("http://localhost:5000/api/auth/");
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
const registerUserAction = (name, email, password) => async (dispatch) => {
	const newUser = {
		name,
		email,
		password,
	};

	try {
		const res = await axios.post(
			"http://localhost:5000/api/users/register",
			newUser
		);
		dispatch({
			type: REGISTRATION_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUserAction());
		// dispatch(setAlertAction(res.data.msg, "success"));
		return res.data.msg;
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((element) => {
				dispatch(setAlertAction(element.msg, "danger"));
			});
		}
		dispatch({
			type: REGISTRATION_FAIL,
		});
	}
};

// LOGIN User
const loginUserAction = (email, password) => async (dispatch) => {
	const newUser = {
		email,
		password,
	};

	try {
		const res = await axios.post(
			"http://localhost:5000/api/auth/login",
			newUser
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUserAction());
		// dispatch(setAlertAction(res.data.msg, "success"));
		return res.data.msg;
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((element) => {
				dispatch(setAlertAction(element.msg, "danger"));
			});
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

const logoutAction = () => (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	});
	dispatch({
		type: LOGOUT,
	});
};

const deleteAccountAction = () => async (dispatch) => {
	try {
		const res = await axios.delete("http://localhost:5000/api/users/delete");
		dispatch({
			type: DELETE_ACCOUNT,
			// payload: res.data.profile,
		});
		dispatch(setAlertAction(res.data.msg));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err?.response.data,
				status: err.response.status,
			},
		});
	}
};

export {
	loadUserAction,
	registerUserAction,
	loginUserAction,
	logoutAction,
	deleteAccountAction,
};
