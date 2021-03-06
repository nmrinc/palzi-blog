import { GET_TODOS, UPDATE_USER_ID, UPDATE_TITLE, ADD_TODO } from '../types/todosTypes';

const INITIAL_STATE = {
	isLoading: false,
	todos: {},
	error: null,
	user_id: '',
	title: '',
	redirect: false,
};

const todosReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case `${GET_TODOS}_PENDING`:
			return { ...state, isLoading: true };

		case `${GET_TODOS}_FULFILLED`:
			return { ...state, isLoading: false, todos: action.payload, redirect: false };

		case `${GET_TODOS}_REJECTED`:
			return { ...state, isLoading: false, error: action.payload };

		case `${UPDATE_USER_ID}_FULFILLED`:
			return { ...state, user_id: action.payload };

		case `${UPDATE_TITLE}_FULFILLED`:
			return { ...state, title: action.payload };

		case `${ADD_TODO}_FULFILLED`:
			return { ...state, isLoading: false, todos: {}, redirect: true, user_id: '', title: '' }

		default:
			return state;
	}
};

export default todosReducer;
