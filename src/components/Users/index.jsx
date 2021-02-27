import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../actions/userActions';

class Users extends Component {
	componentDidMount() {
		this.props.getUsers();
	}

	assembleList = () =>
		this.props.users.map((item) => (
			<tr key={item.id}>
				<td>{item.name}</td>
				<td>{item.email}</td>
				<td>{item.website}</td>
			</tr>
		));

	render() {
		return (
			<div>
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
			</div>
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
