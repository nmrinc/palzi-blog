import React from 'react';

const Table = (props) => {
	return (
		<>
			<h1>Users</h1>
			<table className="global_table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Mail</th>
						<th>URL</th>
					</tr>
				</thead>
				<tbody>{props.act()}</tbody>
			</table>
		</>
	);
};

export default Table;
