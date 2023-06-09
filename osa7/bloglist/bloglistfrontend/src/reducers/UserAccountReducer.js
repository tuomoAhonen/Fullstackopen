import {useReducer, createContext, useContext} from 'react';

const initializer = {user: null};

const userAccountReducer = (state, action) => {
	switch (action.type) {
		case 'user':
			return {user: action.payload};
		case null:
			return initializer;
		default:
			return state;
	}
};

const UserAccountContext = createContext();

export const UserAccountContextProvider = (props) => {
	const [userAccount, userAccountDispatch] = useReducer(userAccountReducer, initializer);
	return <UserAccountContext.Provider value={[userAccount, userAccountDispatch]}>{props.children}</UserAccountContext.Provider>;
};

export const useUserAccountValue = () => {
	const userAndDispatch = useContext(UserAccountContext);
	return userAndDispatch[0];
};

export const useUserAccountDispatch = () => {
	const userAndDispatch = useContext(UserAccountContext);
	return userAndDispatch[1];
};

export default UserAccountContext;
