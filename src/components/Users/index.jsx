import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		};
	}

	async componentDidMount() {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);

		this.setState({
			users: response.data,
		});
	}

	ponerFilas = () =>
		this.state.users.map((item) => (
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

export default Users;
