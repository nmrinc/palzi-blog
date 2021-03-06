import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../../actions/userActions';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Table from './Table';
import Fatal from '../General/Fatal';

class Users extends Component {
	componentDidMount() {
		if (!this.props.users.length) {
			this.props.getUsers();
		}
	}

	assembleList = () => {
		if (this.props.isLoading) {
			return (
				<tr>
					<td>
						<Skeleton count={5} />
					</td>
					<td>
						<Skeleton count={5} />
					</td>
					<td>
						<Skeleton count={5} />
					</td>
				</tr>
			);
		} else {
			return this.props.users.map((item, key) => (
				<tr key={item.id}>
					<td>{item.name}</td>
					<td>{item.email}</td>
					<td>{item.website}</td>
					<td>
						{
							<Link to={`/posts/${key}`}>
								<FontAwesomeIcon icon={faEye} size="lg" />
							</Link>
						}
					</td>
				</tr>
			));
		}
	};

	render() {
		return (
			<>
				{this.props.errorMsg ? (
					<Fatal errMsg={this.props.errorMsg} />
				) : (
					<Table act={this.assembleList} />
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return state.usersReducer;
};

const mapDispatchToProps = (dispatch) => ({
	getUsers: () => {
		dispatch(getUsers());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
