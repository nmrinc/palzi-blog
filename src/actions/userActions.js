import actionTypes from './actionTypes';

export const getUsers = () => (dispatch) => {
	dispatch({
		type: actionTypes.GET_USERS,
		payload: [1, 2, 3],
	});
};
