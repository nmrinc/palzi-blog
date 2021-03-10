import React, { useEffect, useState } from 'react';
import useDebounceValue from '../../hooks/useDebounceValue.js';

const DebouncedInput = (props) => {
	const { initialValue, cb } = props;
	const [value, setValue] = useState(initialValue);
	const debouncedValue = useDebounceValue(value, 500);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		let didCancel = false;
		if (!didCancel) {
			cb(debouncedValue);
		}
		return () => {
			didCancel = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	const inputElement = (
		<>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</>
	);

	return inputElement;
};

export default DebouncedInput;
