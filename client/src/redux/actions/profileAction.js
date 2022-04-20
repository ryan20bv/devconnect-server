import axios from "axios";
import { setAlertAction } from "./alertAction";
import {
	GET_PROFILE,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	DELETE_EXPERIENCE,
	DELETE_EDUCATION,
	CLEAR_PROFILE,
	GET_ALL_PROFILE,
	GET_REPOS,
	SET_LOADING,
} from "./types";

const getCurrentProfileAction = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: SET_LOADING });
	try {
		const res = await axios.get("http://localhost:5000/api/profile/me");
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err?.response.data.error.msg,
				status: err.response.status,
			},
		});
	}
};

const getAllProfileAction = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: SET_LOADING });
	try {
		const res = await axios.get("http://localhost:5000/api/profile/allprofile");
		dispatch({
			type: GET_ALL_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err?.response.data.error.msg,
				status: err.response.status,
			},
		});
	}
};

const getProfileByUserIdAction = (userId) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const res = await axios.get(
			"http://localhost:5000/api/profile/user/" + userId
		);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err?.response.data.errors.msg,
				status: err.response.status,
			},
		});
	}
};

const getGithubByNameAction = (githubName) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const res = await axios.get(
			"http://localhost:5000/api/profile/github/" + githubName
		);
		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err?.response.data.error.msg,
				status: err.response.status,
			},
		});
	}
};

const createProfileAction =
	(profileData, edit = false) =>
	async (dispatch) => {
		dispatch({ type: SET_LOADING });
		try {
			const res = await axios.post(
				"http://localhost:5000/api/profile/create",
				profileData
			);
			dispatch({
				type: GET_PROFILE,
				payload: res.data.profile,
			});

			dispatch(
				edit
					? setAlertAction("Profile Updated", "success")
					: setAlertAction("Profile Created", "success")
			);
			return res.data.msg;
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((element) => {
					dispatch(setAlertAction(element.msg, "danger"));
				});
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err?.response.data.error.msg,
					status: err.response.status,
				},
			});
		}
	};

const newExperienceAction = (experienceData) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const res = await axios.put(
			"http://localhost:5000/api/profile/user/experience",
			experienceData
		);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlertAction("Experience added", "success"));
		return res.data.msg;
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((element) => {
				dispatch(setAlertAction(element.msg, "danger"));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err?.response.data,
				status: err.response.status,
			},
		});
	}
};

const newEducationAction = (educationData) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const res = await axios.put(
			"http://localhost:5000/api/profile/user/education",
			educationData
		);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlertAction("Education added", "success"));
		return res.data.msg;
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((element) => {
				dispatch(setAlertAction(element.msg, "danger"));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err?.response.data,
				status: err.response.status,
			},
		});
	}
};

const deleteExperienceAction = (id) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const res = await axios.delete(
			"http://localhost:5000/api/profile/user/experience/" + id
		);
		dispatch({
			type: DELETE_EXPERIENCE,
			payload: res.data,
		});
		dispatch(setAlertAction(res.data.msg, "success"));
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

const deleteEducationAction = (id) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const res = await axios.delete(
			"http://localhost:5000/api/profile/user/education/" + id
		);
		dispatch({
			type: DELETE_EDUCATION,
			payload: res.data,
		});
		dispatch(setAlertAction(res.data.msg, "success"));
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
	getCurrentProfileAction,
	createProfileAction,
	newExperienceAction,
	newEducationAction,
	deleteExperienceAction,
	deleteEducationAction,
	getAllProfileAction,
	getProfileByUserIdAction,
	getGithubByNameAction,
};
