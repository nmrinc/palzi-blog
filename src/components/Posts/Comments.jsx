import React from 'react';
import { useSelector } from 'react-redux';
import Fatal from '../General/Fatal';
import Skeleton from 'react-loading-skeleton';

const Comments = (props) => {
	const postsReducer = useSelector((reducers) => reducers.postsReducer);

	if (postsReducer.com_error) return <Fatal errMsg={postsReducer.com_error} />;

	const renderComments = () => {
		if (postsReducer.com_isLoading && !props.comments.length) {
			return (
				<li>
					<b>
						<u>
							<Skeleton width={'50%'} />
						</u>
					</b>
					<br />
					<Skeleton count={2} />
				</li>
			);
		}

		return props.comments.map((comment) => (
			<li key={comment.id}>
				<b>
					<u>{comment.email}</u>
				</b>
				<br />
				{comment.body}
			</li>
		));
	};

	return <ul>{renderComments()}</ul>;
};

export default Comments;
