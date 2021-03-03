import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../actions/userActions';
import { getPostsByUser } from '../../actions/postsActions';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlushed } from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
	const usersReducer = useSelector((reducers) => reducers.usersReducer);
	const postsReducer = useSelector((reducers) => reducers.postsReducer);
	const dispatch = useDispatch();
	const { key } = useParams();

	/* console.clear();
	console.log('=====Users===============================');
	console.log(usersReducer);
	console.log('=====Posts===============================');
	console.log(postsReducer);
	console.log('===================================='); */

	const center = {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	};

	useEffect(() => {
		if (!usersReducer.users.length) {
			dispatch(getUsers());
		}
	}, [dispatch, usersReducer.users.length]);

	useEffect(() => {
		if (usersReducer.users.length >= 1) {
			dispatch(getPostsByUser(key));
		}
	}, [dispatch, key, postsReducer.posts.length, usersReducer.users.length]);

	if (usersReducer.isLoading) {
		return (
			<>
				<h1>
					<Skeleton width={'50%'} />
				</h1>
				<h2>
					<Skeleton />
				</h2>
			</>
		);
	}

	if (usersReducer.users.length && usersReducer.users[key] === undefined) {
		return (
			<>
				<h1 style={center}>
					<FontAwesomeIcon
						icon={faFlushed}
						size="3x"
						style={{ marginRight: '.2em' }}
					/>
					Fuck! Can't find this guy
				</h1>
				<small style={center}>{usersReducer.errorMsg}</small>
			</>
		);
	}

	return (
		<>
			<h1>Posts from</h1>
			<div>
				{usersReducer.users.length && <h2>{usersReducer.users[key].name}</h2>}
			</div>
		</>
	);
};

export default Posts;
