import React from 'react';

const App = () => {
	const ponerFilas = () => [
		<tr>
			<td>Erick</td>
			<td>nmr.inc@icloud.com</td>
			<td>nrm_inc.com</td>
		</tr>,
		<tr>
			<td>Platzi</td>
			<td>platzi@platzi.com</td>
			<td>platzi.com</td>
		</tr>,
	];

	return (
		<div className="margen">
			<table className="tabla">
				<thead>
					<th>Name</th>
					<th>Mail</th>
					<th>URL</th>
				</thead>
				<tbody>{ponerFilas()}</tbody>
			</table>
		</div>
	);
};

export default App;
