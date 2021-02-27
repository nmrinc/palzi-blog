import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getUsers } from '../../actions/userActions';

class Users extends Component {
	componentDidMount() {
		/* const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);

		this.setState({
			users: response.data,
		}); */
		this.props.getUsers();
	}

	ponerFilas = () =>
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
					<tbody>{this.ponerFilas()}</tbody>
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
