import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import {
	update_UserId,
	update_title,
	add_todo,
	edit_todo,
	getTodos,
} from '../../actions/todosActions';
import Fatal from '../General/Fatal';
import DebouncedInput from '../General/DebouncedInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Save_todo = () => {
	const todosReducer = useSelector((reducers) => reducers.todosReducer);
	const dispatch = useDispatch();
	const { userId, todoId } = useParams();
	const [stUserId, setUserId] = useState(todosReducer.user_id || '');
	const [stTitle, setStTitle] = useState(todosReducer.title || '');

	useEffect(() => {
		let didCancel = false;

		if (!didCancel) {
			if (!Object.keys(todosReducer.todos).length) {
				dispatch(getTodos());
			}

			if (userId && todoId && Object.keys(todosReducer.todos).length) {
				const todo = todosReducer.todos[userId][todoId];
				dispatch(update_UserId(todo.userId));
				dispatch(update_title(todo.title));
				setUserId(todo.userId);
				setStTitle(todo.title);
			}
		}

		return () => {
			didCancel = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todosReducer.todos]);

	const updateUserId = (value) => {
		dispatch(update_UserId(value));
	};

	const updateTitle = (value) => {
		dispatch(update_title(value));
	};

	const save = () => {
		const { user_id, title, todos } = todosReducer;
		const new_todo = {
			userId: user_id,
			title: title,
			completed: false,
		};

		if (userId && todoId) {
			const todo = todos[userId][todoId];
			const edited_todo = {
				...new_todo,
				completed: todo.completed,
				id: todo.id,
			};

			dispatch(edit_todo(edited_todo));
		} else {
			dispatch(add_todo(new_todo));
		}
	};

	const validate = () => {
		const { user_id, title, isLoading } = todosReducer;
		if (isLoading) return true;
		if (!user_id || !title) return true;

		return false;
	};

	const actionInfo = () => {
		const { isLoading, error } = todosReducer;

		if (isLoading)
			return (
				<>
					&nbsp;
					<FontAwesomeIcon icon={faSpinner} spin />
				</>
			);
		if (error) return <Fatal errMsg={error} />;
	};

	/* console.log('=====todosReducer===============================');
	console.log(todosReducer);
	console.log('=====debouncedUserId===============================');
	console.log(debouncedUserId);
	console.log('===================================='); */

	return (
		<div>
			{todosReducer.redirect && <Redirect to="/todos" />}
			<h1>Save new To-do</h1>
			User id:&nbsp;
			<DebouncedInput initialValue={stUserId} cb={updateUserId} />
			<br />
			<br />
			Title:&nbsp;
			<DebouncedInput initialValue={stTitle} cb={updateTitle} />
			<br />
			<br />
			<button onClick={save} disabled={validate()}>
				Save
			</button>
			{actionInfo()}
		</div>
	);
};

export default Save_todo;
