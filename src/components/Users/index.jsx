import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';
import { SkeletonBodyText } from 'react-skeleton-content';

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
					<h1>{this.props.errorMsg}</h1>
				) : (
					<table className="global_table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Mail</th>
								<th>URL</th>
							</tr>
						</thead>
						<tbody>{this.assembleList()}</tbody>
					</table>
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
