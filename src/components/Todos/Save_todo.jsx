import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update_UserId, update_title } from '../../actions/todosActions';
import useDebounceValue from '../../hooks/useDebounceValue';

const Save_todo = () => {
	const todosReducer = useSelector((reducers) => reducers.todosReducer);
	const dispatch = useDispatch();
	const [userId, setUserId] = useState(todosReducer.user_id);
	const [title, setTitle] = useState(todosReducer.title);

	const debouncedUserId = useDebounceValue(userId, 500);
	const debouncedTitle = useDebounceValue(title, 500);

	useEffect(() => {
		let didCancel = false;
		if (!didCancel) {
			dispatch(update_UserId(userId));
			dispatch(update_title(title));
		}
		return () => {
			didCancel = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedUserId, debouncedTitle]);

	/* console.log('=====todosReducer===============================');
	console.log(todosReducer);
	console.log('=====debouncedUserId===============================');
	console.log(debouncedUserId);
	console.log('===================================='); */

	return (
		<div>
			<h1>Save new To-do</h1>
			User id:&nbsp;
			<input
				type="number"
				value={userId}
				onChange={(e) => setUserId(e.target.value)}
			/>
			<br />
			<br />
			Title:&nbsp;
			<input
				type="Text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<br />
			<br />
			<button>Save</button>
		</div>
	);
};

export default Save_todo;
