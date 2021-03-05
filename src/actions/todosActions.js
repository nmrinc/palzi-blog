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

		const todos = {};
		//@a Iterate through the response array
		response.data.map(
			(item) =>
				//@a Create an object with the userId property inside the todos object
				(todos[item.userId] = {
					//@a Add everything that the object has to create immutability
					...todos[item.userId],
					//@a Add a new object with the to-do id property and add everything that the object has in the response
					[item.id]: { ...item },
				})
		);

		dispatch({
			type: `${GET_TODOS}_FULFILLED`,
			payload: todos,
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
