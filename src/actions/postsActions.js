import { GET_POSTS } from '../types/postsTypes';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
	dispatch({
		type: `${GET_POSTS}_PENDING`,
	});

	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/posts'
		);

		dispatch({
			type: `${GET_POSTS}_FULFILLED`,
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: `${GET_POSTS}_REJECTED`,
			payload: error.message,
		});
	}
};
