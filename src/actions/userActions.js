import { GET_USERS } from '../types/usersTypes';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/users'
	);

	dispatch({
		type: GET_USERS,
		payload: response.data,
	});
};
