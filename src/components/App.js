import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
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
			<div className="margen">
				<table className="tabla">
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

export default App;
