import axios from "axios";
import { setAlertAction } from "./alertAction";
import {
	GET_PROFILE,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	DELETE_EXPERIENCE,
	DELETE_EDUCATION,
} from "./types";

const getCurrentProfileAction = () => async (dispatch) => {
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

const createProfileAction =
	(profileData, edit = false) =>
	async (dispatch) => {
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
	try {
		const res = await axios.put(
			"http://localhost:5000/api/profile/user/experience",
			experienceData
		);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data.profile,
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
	try {
		const res = await axios.put(
			"http://localhost:5000/api/profile/user/education",
			educationData
		);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data.profile,
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
	try {
		const res = await axios.delete(
			"http://localhost:5000/api/profile/user/experience/" + id
		);
		dispatch({
			type: DELETE_EXPERIENCE,
			payload: res.data.profile,
		});
		dispatch(setAlertAction(res.data.msg, "success"));
	} catch (err) {
		console.log(err);
	}
};

const deleteEducationAction = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(
			"http://localhost:5000/api/profile/user/education/" + id
		);
		dispatch({
			type: DELETE_EDUCATION,
			payload: res.data.profile,
		});
		dispatch(setAlertAction(res.data.msg, "success"));
	} catch (err) {
		console.log(err);
	}
};

export {
	getCurrentProfileAction,
	createProfileAction,
	newExperienceAction,
	newEducationAction,
	deleteExperienceAction,
	deleteEducationAction,
};
