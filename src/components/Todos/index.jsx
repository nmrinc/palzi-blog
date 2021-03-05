import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../actions/todosActions';
/* import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlushed } from '@fortawesome/free-solid-svg-icons';
import Fatal from '../General/Fatal';
import Comments from './Comments'; */

const Todos = () => {
	const todosReducer = useSelector((reducers) => reducers.todosReducer);
	const dispatch = useDispatch();
	// const { key } = useParams();

	useEffect(() => {
		if (!todosReducer.todos.length) {
			dispatch(getTodos());
		}
	}, [dispatch, todosReducer.todos.length]);

	console.log('=====To-dos===============================');
	console.log(todosReducer);
	console.log('====================================');

	return <h1>Todos</h1>;
};

export default Todos;
