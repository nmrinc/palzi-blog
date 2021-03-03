import { GET_POSTS_BY_USER } from '../types/postsTypes';

const INITIAL_STATE = {
	isLoading: false,
	posts: [],
	errorMsg: null,
};

const usersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${GET_POSTS_BY_USER}_PENDING`:
			return { ...state, isLoading: true };

		case `${GET_POSTS_BY_USER}_FULFILLED`:
			return { ...state, isLoading: false, posts: action.payload };

		case `${GET_POSTS_BY_USER}_REJECTED`:
			return { ...state, isLoading: false, errorMsg: action.payload };

		default:
			return state;
	}
};

export default usersReducer;
