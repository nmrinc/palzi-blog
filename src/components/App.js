import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usuarios: [],
		};
	}

	async componentDidMount() {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);
		console.log('====================================');
		console.log(response.data);
		console.log('====================================');
		this.setState({
			usuarios: [
				{
					name: 'Erick',
					mail: 'nmr.inc@icloud.com',
					url: 'nmr_inc.com',
				},
				{
					name: 'Platzi',
					mail: 'platzi@platzi.com',
					url: 'platzi.com',
				},
			],
		});
	}

	ponerFilas = () =>
		this.state.usuarios.map((item) => (
			<tr>
				<td>{item.name}</td>
				<td>{item.mail}</td>
				<td>{item.url}</td>
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
