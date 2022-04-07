import { REGISTRATION_SUCCESS, REGISTRATION_FAIL } from "./types";
import axios from "axios";
import { setAlertAction } from "./alertAction";

// register user
export const registerUserAction =
	(name, email, password) => async (dispatch) => {
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
				type: REGISTRATION_FAIL,
			});
		}
	};
