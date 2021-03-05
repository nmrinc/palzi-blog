import { GET_TODOS } from '../types/todosTypes';
import axios from 'axios';

export const getTodos = () => async (dispatch) => {
	dispatch({
		type: `${GET_TODOS}_PENDING`,
	});
	console.log('GET_TODOS_PENDING');

	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/todos'
		);

		dispatch({
			type: `${GET_TODOS}_FULFILLED`,
			payload: response.data,
		});
		console.log('GET_TODOS_FULFILLED');
	} catch (error) {
		dispatch({
			type: `${GET_TODOS}_REJECTED`,
			payload: error.message,
		});
		console.log('GET_TODOS_REJECTED');
	}
};
