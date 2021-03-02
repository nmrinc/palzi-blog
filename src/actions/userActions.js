import { GET_USERS } from '../types/usersTypes';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);

		dispatch({
			type: GET_USERS,
			payload: response.data,
		});
	} catch (error) {
		console.log('====================================');
		console.error(
			`Error found:
			${error.message}`
		);
		console.log('====================================');
	}
};
