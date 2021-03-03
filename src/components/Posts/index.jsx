import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../actions/userActions';
import { getPostsByUser } from '../../actions/postsActions';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlushed } from '@fortawesome/free-solid-svg-icons';
import Fatal from '../General/Fatal';

const Posts = () => {
	const usersReducer = useSelector((reducers) => reducers.usersReducer);
	const postsReducer = useSelector((reducers) => reducers.postsReducer);
	const dispatch = useDispatch();
	const { key } = useParams();

	console.clear();
	console.log('=====Users===============================');
	console.log(usersReducer);
	console.log('=====Posts===============================');
	console.log(postsReducer);
	console.log('====================================');

	const center = {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 0,
	};

	useEffect(() => {
		if (!usersReducer.users.length) {
			dispatch(getUsers());
		}
	}, [dispatch, usersReducer.users.length]);

	useEffect(() => {
		if (
			usersReducer.users.length >= 1 &&
			!('posts_key' in usersReducer.users[key])
		) {
			dispatch(getPostsByUser(key));
		}
	}, [dispatch, key, usersReducer.users, usersReducer.users.length]);

	const renderPosts = () => {
		if (!usersReducer.users.length) return;
		if (usersReducer.errorMsg) return;

		if (postsReducer.isLoading) {
			return (
				<>
					<hr />
					<h2>
						<Skeleton width={'80%'} />
					</h2>
					<p>
						<Skeleton count={2} />
					</p>
				</>
			);
		}
		if (postsReducer.errorMsg) {
			return <Fatal errMsg={postsReducer.errorMsg} />;
		}
		if (!postsReducer.posts.length) return;

		const { posts_key } = usersReducer.users[key];

		return postsReducer.posts[posts_key].map((post) => (
			<div key={post.id}>
				<hr />
				<h2>{post.title}</h2>
				<p>{post.body}</p>
			</div>
		));
	};

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

	if (usersReducer.users.errorMsg || usersReducer.users[key] === undefined) {
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
			{usersReducer.users.length && (
				<h1>Posts from {usersReducer.users[key].name}</h1>
			)}
			{renderPosts()}
		</>
	);
};

export default Posts;
