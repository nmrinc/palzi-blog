import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTodos } from '../../actions/todosActions';
import Fatal from '../General/Fatal';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const Todos = () => {
	const todosReducer = useSelector((reducers) => reducers.todosReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!Object.keys(todosReducer.todos).length) {
			dispatch(getTodos());
		}
	}, [dispatch, todosReducer.todos]);

	const showContent = () => {
		const { todos, isLoading, error } = todosReducer;

		if (error) return <Fatal errMsg={error} />;

		return Object.keys(todos).map((user_id) => (
			<div key={user_id}>
				<h2>User {user_id}</h2>
				<div className="todos_container">
					{isLoading ? (
						<>
							<Skeleton count={5} />
						</>
					) : (
						renderTodos(user_id)
					)}
				</div>
			</div>
		));
	};

	const renderTodos = (user_id) => {
		const { todos } = todosReducer;
		const by_user = {
			...todos[user_id],
		};

		return Object.keys(by_user).map((todo_id) => (
			<div key={todo_id}>
				<input type="checkbox" defaultChecked={by_user[todo_id].completed} />
				{by_user[todo_id].title}
				<Link to={`/todos/save_todo/${user_id}/${todo_id}`}>
					<button className="ml-1" alt="Edit">
						<FontAwesomeIcon icon={faPencilAlt} />
					</button>
				</Link>
				<Link>
					<button className="ml-1" alt="Delete">
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</Link>
			</div>
		));
	};

	return (
		<>
			<Link to="/todos/save_todo">
				<button>Add new to-do</button>
			</Link>
			{showContent()}
		</>
	);
};

export default Todos;
