import {useReducer, createContext, useContext} from 'react';

const initializer = [];

const usersReducer = (state, action) => {
	switch (action.type) {
		case 'setUsers':
			//console.log(action);
			return action.payload;
		default:
			return state;
	}
};

const UsersContext = createContext();

export const UsersContextProvider = (props) => {
	const [users, usersDispatch] = useReducer(usersReducer, initializer);
	return <UsersContext.Provider value={[users, usersDispatch]}>{props.children}</UsersContext.Provider>;
};

export const useUsersValue = () => {
	const usersAndDispatch = useContext(UsersContext);
	return usersAndDispatch[0];
};

export const useUsersDispatch = () => {
	const usersAndDispatch = useContext(UsersContext);
	return usersAndDispatch[1];
};

export default UsersContext;
