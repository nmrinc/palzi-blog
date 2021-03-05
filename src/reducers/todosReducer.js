import { GET_TODOS } from '../types/todosTypes';

const INITIAL_STATE = {
	isLoading: false,
	todos: {},
	error: null,
};

const todosReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case `${GET_TODOS}_PENDING`:
			return { ...state, isLoading: true };

		case `${GET_TODOS}_FULFILLED`:
			return { ...state, isLoading: false, todos: action.payload };

		case `${GET_TODOS}_REJECTED`:
			return { ...state, isLoading: false, error: action.payload };

		default:
			return state;
	}
};

export default todosReducer;
