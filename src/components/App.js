import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		};
	}

	ponerFilas = () => {
		this.state.usuarios.map((item) => (
			<tr>
				<td>{item.name}</td>
				<td>{item.mail}</td>
				<td>{item.url}</td>
			</tr>
		));
	};

	render() {
		return (
			<div className="margen">
				<table className="tabla">
					<thead>
						<th>Name</th>
						<th>Mail</th>
						<th>URL</th>
					</thead>
					<tbody>{this.ponerFilas()}</tbody>
				</table>
			</div>
		);
	}
}

export default App;
