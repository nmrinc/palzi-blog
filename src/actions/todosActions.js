import { GET_TODOS, UPDATE_USER_ID, UPDATE_TITLE, ADD_TODO, EDIT_TODO, UPDATE, DELETE, CLEAN } from '../types/todosTypes';
import axios from 'axios';

export const getTodos = () => async (dispatch) => {
	dispatch({
		type: `${GET_TODOS}_PENDING`,
	});

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

	} catch (error) {
		dispatch({
			type: `${GET_TODOS}_REJECTED`,
			payload: error.message,
		});

	}
};

export const update_UserId = (payload) => (dispatch) => {
	dispatch({
		type: `${UPDATE_USER_ID}_FULFILLED`,
		payload: payload,
	});
};

export const update_title = (payload) => (dispatch) => {
	dispatch({
		type: `${UPDATE_TITLE}_FULFILLED`,
		payload: payload,
	});
};

export const add_todo = (payload) => async (dispatch) => {
	dispatch({ type: `${GET_TODOS}_PENDING` });

	try {
		const response = await axios.post('https://jsonplaceholder.typicode.com/todos', payload);

		dispatch({ type: `${ADD_TODO}_FULFILLED` });
	} catch (e) {
		dispatch({
			type: `${GET_TODOS}_REJECTED`,
			payload: `Shit can't be posted 'cause:
			${e.message}`,
		})
	}
}

export const edit_todo = (payload) => async (dispatch) => {
	dispatch({ type: `${GET_TODOS}_PENDING` });

	try {
		const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${payload.id}`, payload);

		dispatch({ type: `${EDIT_TODO}_FULFILLED` });
	} catch (e) {
		dispatch({
			type: `${GET_TODOS}_REJECTED`,
			payload: `Shit can't be edited 'cause:
			${e.message}`,
		})
	}
}

export const update_check = ({ user_id, todo_id }) => async (dispatch, getState) => {
	const { todos } = getState().todosReducer;
	const selected = todos[user_id][todo_id];

	//@concept Immutability
	//@context Whe we update a property, if we don't destructure inside the objects, the update can be applied without triggering a dispatch
	//@a Create an updated object getting all the items from the actual reducer
	const updated = {
		...todos,
	};
	//@a Get the items by user and apply them to the user object
	updated[user_id] = {
		...todos[user_id]
	};
	//@a Get inside the selected item and destructure the actual item in reducer. And then update the property
	updated[user_id][todo_id] = {
		...todos[user_id][todo_id],
		completed: !selected.completed
	}

	dispatch({
		type: `${UPDATE}_FULFILLED`,
		payload: updated,
	})
}

export const delete_todo = ({ todo_id }) => async (dispatch, get) => {
	dispatch({ type: `${GET_TODOS}_PENDING` });

	try {
		const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo_id}`);

		/* console.log('=====delete_todo===============================');
		console.log(response);
		console.log('=====delete_todo==============================='); */

		dispatch({
			type: `${GET_TODOS}_FULFILLED`,
			payload: {},
		});
	} catch (e) {
		dispatch({
			type: `${DELETE}_REJECTED`,
			payload: `Shit can't be deleted 'cause:
			${e.message}`,
		})
	}
};

export const clear_form = () => (dispatch) => {
	dispatch({
		type: CLEAN
	})
}