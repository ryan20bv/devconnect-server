import axios from "axios";
import { setAlertAction } from "./alertAction";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

const getCurrentProfileAction = () => async (dispatch) => {
	try {
		const res = await axios.get("http://localhost:5000/api/profile/me");
		console.log(res.data);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

export { getCurrentProfileAction };
