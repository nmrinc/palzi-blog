import { GET_POSTS_BY_USER } from '../types/postsTypes';
import axios from 'axios';

export const getPostsByUser = (key) => async (dispatch, getState) => {
	const { users } = getState().usersReducer;
	const { posts } = getState().postsReducer;
	const user_id = users[key].id;

	dispatch({
		type: `${GET_POSTS_BY_USER}_PENDING`,
	});

	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`
		);

		const updated_posts = [...posts, response.data];

		dispatch({
			type: `${GET_POSTS_BY_USER}_FULFILLED`,
			payload: updated_posts,
		});
	} catch (e) {
		dispatch({
			type: `${GET_POSTS_BY_USER}_REJECTED`,
			payload: e.message,
		});
	}
};
