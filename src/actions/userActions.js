import actionTypes from './actionTypes';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/users'
	);

	dispatch({
		type: actionTypes.GET_USERS,
		payload: response.data,
	});
};
