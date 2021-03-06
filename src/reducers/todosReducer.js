import { GET_TODOS, UPDATE_USER_ID, UPDATE_TITLE } from '../types/todosTypes';

const INITIAL_STATE = {
	isLoading: false,
	todos: {},
	error: null,
	user_id: '',
	title: '',
};

const todosReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case `${GET_TODOS}_PENDING`:
			return { ...state, isLoading: true };

		case `${GET_TODOS}_FULFILLED`:
			return { ...state, isLoading: false, todos: action.payload };

		case `${GET_TODOS}_REJECTED`:
			return { ...state, isLoading: false, error: action.payload };

		case `${UPDATE_USER_ID}_FULFILLED`:
			return { ...state, user_id: action.payload };

		case `${UPDATE_TITLE}_FULFILLED`:
			return { ...state, title: action.payload };

		default:
			return state;
	}
};

export default todosReducer;
