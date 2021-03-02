import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';
import { SkeletonBodyText } from 'react-skeleton-content';
import Table from './Table';
import Fatal from '../General/Fatal';

class Users extends Component {
	componentDidMount() {
		this.props.getUsers();
	}

	assembleList = () => {
		if (this.props.isLoading) {
			return (
				<tr>
					<td>
						<SkeletonBodyText />
					</td>
					<td>
						<SkeletonBodyText />
					</td>
					<td>
						<SkeletonBodyText />
					</td>
				</tr>
			);
		} else {
			return this.props.users.map((item) => (
				<tr key={item.id}>
					<td>{item.name}</td>
					<td>{item.email}</td>
					<td>{item.website}</td>
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
