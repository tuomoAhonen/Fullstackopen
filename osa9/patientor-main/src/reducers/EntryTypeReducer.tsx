import {useReducer, createContext, useContext} from 'react';
import {HealthCheckRating} from '../types';

const entryTypeReducer = (state: any, action: any) => {
	if (action.payload) {
		return action.payload;
	} else {
		return state;
	}
};

const EntryTypeContext = createContext<any>(undefined);

export const EntryTypeContextProvider = (props: any) => {
	const [value, dispatch] = useReducer<any>(entryTypeReducer, 0 as HealthCheckRating);
	return <EntryTypeContext.Provider value={[value, dispatch]}>{props.children}</EntryTypeContext.Provider>;
};

export const useValue = () => {
	const valueAndDispatch = useContext(EntryTypeContext);
	return valueAndDispatch[0];
};

export const useDispatch = () => {
	const valueAndDispatch = useContext(EntryTypeContext);
	const dispatch = valueAndDispatch[1];
	return (payload: any /*, type: EntryType*/) =>
		dispatch({
			payload: payload,
			/*type: type,*/
		});
};

export default EntryTypeContext;
