import { GET_POSTS_BY_USER } from '../types/postsTypes';
import { GET_USERS } from '../types/usersTypes';
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

		const posts_key = updated_posts.length - 1;
		const updated_users = [...users];
		updated_users[key] = { ...users[key], posts_key: posts_key };

		dispatch({
			type: `${GET_USERS}_FULFILLED`,
			payload: updated_users,
		});

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
