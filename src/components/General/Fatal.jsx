import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

const Fatal = (props) => (
	<div className="container">
		<div className="col">
			<FontAwesomeIcon
				icon={faSkullCrossbones}
				size="5x"
				style={{ color: 'rgb(180,0,0)' }}
			/>
		</div>
		<div className="col">
			<h1>This Shit Crashed!</h1>
			<h2>Please try again later</h2>
			<small>{props.errMsg}</small>
		</div>
	</div>
);
export default Fatal;
