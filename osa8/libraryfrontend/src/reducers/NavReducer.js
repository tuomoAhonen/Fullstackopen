import {useReducer, createContext, useContext} from 'react';

const initializer = 'Authors';

const navReducer = (state, action) => {
	if (action.payload) {
		return action.payload;
	} else {
		return state;
	}
};

const NavContext = createContext();

export const NavContextProvider = (props) => {
	const [navValue, navDispatch] = useReducer(navReducer, initializer);
	return <NavContext.Provider value={[navValue, navDispatch]}>{props.children}</NavContext.Provider>;
};

export const useNavValue = () => {
	const valueAndDispatch = useContext(NavContext);
	return valueAndDispatch[0];
};

export const useNavDispatch = () => {
	const valueAndDispatch = useContext(NavContext);
	const dispatch = valueAndDispatch[1];
	return (payload /*, type*/) =>
		dispatch({
			payload: payload,
			/*type: type,*/
		});
};

export default NavContext;

/*
	switch (action.type) {
		case 'Authors':
			return action.payload;
		case 'Books':
			return action.payload;
		case 'NewBook':
			return action.payload;
		case 'Login':
			return action.payload;
		case 'NewUser':
			return action.payload;
		case 'Recommendations':
			return action.payload;
		default:
			return state;
	}*/
