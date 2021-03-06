import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
	update_UserId,
	update_title,
	add_todo,
} from '../../actions/todosActions';
import useDebounceValue from '../../hooks/useDebounceValue';
import Fatal from '../General/Fatal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Save_todo = () => {
	const todosReducer = useSelector((reducers) => reducers.todosReducer);
	const dispatch = useDispatch();
	const [userId, setUserId] = useState(todosReducer.user_id);
	const [stTitle, setStTitle] = useState(todosReducer.title);

	const debouncedUserId = useDebounceValue(userId, 500);
	const debouncedTitle = useDebounceValue(stTitle, 500);

	useEffect(() => {
		let didCancel = false;
		if (!didCancel) {
			dispatch(update_UserId(debouncedUserId));
		}
		return () => {
			didCancel = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedUserId]);

	useEffect(() => {
		let didCancel = false;
		if (!didCancel) {
			dispatch(update_title(debouncedTitle));
		}
		return () => {
			didCancel = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedTitle]);

	const save = () => {
		const { user_id, title } = todosReducer;
		const new_todo = {
			user_id: user_id,
			title: title,
			completed: false,
		};

		dispatch(add_todo(new_todo));
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
				value={stTitle}
				onChange={(e) => setStTitle(e.target.value)}
			/>
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
