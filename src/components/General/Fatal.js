import React from 'react';

const Fatal = (props) => (
	<>
		<h1>This Shit Crashed!</h1>
		<h2>Please try again later</h2>
		<small>{props.errMsg}</small>
	</>
);
export default Fatal;
