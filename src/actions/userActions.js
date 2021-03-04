import { GET_USERS } from '../types/usersTypes';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
	dispatch({
		type: `${GET_USERS}_PENDING`,
	});
	console.log('GET_USERS_PENDING');

	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);

		dispatch({
			type: `${GET_USERS}_FULFILLED`,
			payload: response.data,
		});
		console.log('GET_USERS_FULFILLED');
	} catch (error) {
		dispatch({
			type: `${GET_USERS}_REJECTED`,
			payload: error.message,
		});
		console.log('GET_USERS_REJECTED');
	}
};
