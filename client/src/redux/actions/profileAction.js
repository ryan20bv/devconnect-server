import axios from "axios";
import { setAlertAction } from "./alertAction";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

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
			type: GET_PROFILE,
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
			type: GET_PROFILE,
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

export {
	getCurrentProfileAction,
	createProfileAction,
	newExperienceAction,
	newEducationAction,
};
