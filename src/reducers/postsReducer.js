import { GET_POSTS } from '../types/postsTypes';

const INITIAL_STATE = {
	isLoading: false,
	posts: [],
	errorMsg: null,
};

const usersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${GET_POSTS}_PENDING`:
			return { ...state, isLoading: true };

		case `${GET_POSTS}_FULFILLED`:
			return { ...state, isLoading: false, posts: action.payload };

		case `${GET_POSTS}_REJECTED`:
			return { ...state, isLoading: false, errorMsg: action.payload };

		default:
			return state;
	}
};

export default usersReducer;
