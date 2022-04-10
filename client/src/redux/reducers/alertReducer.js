import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [
	{
		msg: null,
		alertType: null,
		id: 1,
	},
];

function alertReducer(state = initialState, action) {
	const { type, payload = 1 } = action;
	switch (type) {
		case SET_ALERT:
			return [payload];
		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== payload.id);
		default:
			return state;
	}
}

export default alertReducer;
