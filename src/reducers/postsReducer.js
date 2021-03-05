import { UPDATE_POSTS, GET_COMMENTS } from '../types/postsTypes';

const INITIAL_STATE = {
	isLoading: false,
	posts: [],
	errorMsg: null,
	com_isLoading: false,
	com_error: null,
};

const postsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${UPDATE_POSTS}_PENDING`:
			return { ...state, isLoading: true };

		case `${UPDATE_POSTS}_FULFILLED`:
			return { ...state, isLoading: false, posts: action.payload };

		case `${UPDATE_POSTS}_REJECTED`:
			return { ...state, isLoading: false, errorMsg: action.payload };

		case `${GET_COMMENTS}_PENDING`:
			return { ...state, com_isLoading: true };

		case `${GET_COMMENTS}_REJECTED`:
			return { ...state, com_isLoading: false, com_error: action.payload };

		default:
			return state;
	}
};

export default postsReducer;
