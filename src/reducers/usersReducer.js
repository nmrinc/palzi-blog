import actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
	users: [],
};

const usersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.GET_USERS:
			return { ...state, users: action.payload };

		default:
			return state;
	}
};

export default usersReducer;
