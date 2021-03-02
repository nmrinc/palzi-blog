import React from 'react';
import { useParams } from 'react-router-dom';

const Posts = () => {
	const { key } = useParams();
	return <div>{key}</div>;
};

export default Posts;
