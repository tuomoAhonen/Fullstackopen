import {useReducer, createContext, useContext} from 'react';

const initialState = {
	previousPath: '/',
	currentPath: '/',
};

export const pathReducer = (state, action) => {
	//console.log(state);
	switch (action.type) {
		case 'setPaths':
			return {previousPath: state.currentPath, currentPath: action.payload};
		default:
			return state;
	}
};

const PathContext = createContext();

export const PathContextProvider = (props) => {
	const [path, pathDispatch] = useReducer(pathReducer, initialState);
	return <PathContext.Provider value={[path, pathDispatch]}>{props.children}</PathContext.Provider>;
};

export const usePathValue = () => {
	const pathAndDispatch = useContext(PathContext);
	return pathAndDispatch[0];
};

export const usePathDispatch = () => {
	const pathAndDispatch = useContext(PathContext);
	const pathDispatch = pathAndDispatch[1];
	return (payload, type) =>
		pathDispatch({
			payload: payload,
			type: type,
		});
};

export default PathContext;
