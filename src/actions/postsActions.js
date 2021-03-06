import { UPDATE_POSTS, GET_COMMENTS } from '../types/postsTypes';
import { GET_USERS } from '../types/usersTypes';
import axios from 'axios';

export const getPostsByUser = (key) => async (dispatch, getState) => {
	dispatch({
		type: `${UPDATE_POSTS}_PENDING`,
	});

	console.log('UPDATE_POSTS_PENDING');

	let { users } = getState().usersReducer;
	const { posts } = getState().postsReducer;
	const user_id = users[key].id;

	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`
		);

		const newOnes = response.data.map((post) => ({
			...post,
			comments: [],
			open: false,
		}));

		const updated_posts = [...posts, newOnes];
		dispatch({
			type: `${UPDATE_POSTS}_FULFILLED`,
			payload: updated_posts,
		});
		console.log('UPDATE_POSTS_FULFILLED');

		const posts_key = updated_posts.length - 1;
		const updated_users = [...users];
		updated_users[key] = { ...users[key], posts_key: posts_key };

		console.log('DISPATCH GET_USERS_FULFILLED FROM postActions');
		dispatch({
			type: `${GET_USERS}_FULFILLED`,
			payload: updated_users,
		});
		console.log('GET_USERS_FULFILLED FROM postActions');
	} catch (e) {
		dispatch({
			type: `${UPDATE_POSTS}_REJECTED`,
			payload: e.message,
		});
		console.log('UPDATE_POSTS_REJECTED');
	}
};

export const openClose = (args) => (dispatch, getState) => {
	const { posts_key, com_key } = args;

	const { posts } = getState().postsReducer;
	const selected = posts[posts_key][com_key];

	const updated = {
		...selected,
		open: !selected.open,
	};

	const updated_posts = [...posts];
	updated_posts[posts_key] = [...posts[posts_key]];
	updated_posts[posts_key][com_key] = updated;

	dispatch({
		type: `${UPDATE_POSTS}_FULFILLED`,
		payload: updated_posts,
	});
};

export const getComments = (args) => async (dispatch, getState) => {
	dispatch({
		type: `${GET_COMMENTS}_PENDING`,
	});

	const { posts_key, com_key } = args;

	const { posts } = getState().postsReducer;
	const selected = posts[posts_key][com_key];

	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`
		);

		const updated = {
			...selected,
			comments: response.data,
		};

		const updated_posts = [...posts];
		updated_posts[posts_key] = [...posts[posts_key]];
		updated_posts[posts_key][com_key] = updated;

		dispatch({
			type: `${GET_COMMENTS}_FULFILLED`,
			payload: updated_posts,
		});
	} catch (e) {
		dispatch({
			type: `${GET_COMMENTS}_REJECTED`,
			payload: e.message,
		});
	}
};
