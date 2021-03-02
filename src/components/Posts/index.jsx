import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../actions/userActions';
import { SkeletonBodyText } from 'react-skeleton-content';

const Posts = () => {
	const reducer = useSelector((reducers) => reducers.usersReducer);
	const dispatch = useDispatch();
	const { key } = useParams();

	useEffect(() => {
		if (!reducer.users.length) {
			dispatch(getUsers());
		}
	}, [dispatch, reducer.users.length]);

	if (reducer.isLoading) {
		return (
			<>
				<h1>Posts from</h1>
				<SkeletonBodyText />
			</>
		);
	}

	if (reducer.errorMsg) {
		return <h1>Ups! Can't find this guy</h1>;
	}

	return (
		<>
			<h1>Posts from</h1>
			<div>{reducer.users.length && <h2>{reducer.users[key].name}</h2>}</div>
		</>
	);
};

export default Posts;
