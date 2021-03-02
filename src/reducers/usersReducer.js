import { GET_USERS } from '../types/usersTypes';

const INITIAL_STATE = {
	isLoading: false,
	users: [],
	errorMsg: null,
};

const usersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${GET_USERS}_PENDING`:
			return { ...state, isLoading: true };

		case `${GET_USERS}_FULFILLED`:
			return { ...state, isLoading: false, users: action.payload };

		case `${GET_USERS}_REJECTED`:
			return { ...state, isLoading: false, errorMsg: action.payload };

		default:
			return state;
	}
};

export default usersReducer;
