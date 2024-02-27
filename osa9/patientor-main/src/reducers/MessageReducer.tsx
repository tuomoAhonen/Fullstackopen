import React, {useReducer, createContext, useContext} from 'react';

const messageReducer = (state: any, action: any) => {
	if (action && action.payload) {
		return {value: action.payload, type: action.type};
	} else {
		return null;
	}
};

const MessageContext = createContext<any>(undefined);

export const MessageContextProvider = (props: any) => {
	const [value, dispatch] = useReducer<any>(messageReducer, null);
	return <MessageContext.Provider value={[value, dispatch]}>{props.children}</MessageContext.Provider>;
};

export const useMessageValue = () => {
	const valueAndDispatch = useContext(MessageContext);
	return valueAndDispatch[0];
};

export const useClearMessageDispatch = () => {
	const valueAndDispatch = useContext(MessageContext);
	const dispatch = valueAndDispatch[1];
	return () => dispatch();
};

export const useMessageDispatch = () => {
	const valueAndDispatch = useContext(MessageContext);
	const dispatch = valueAndDispatch[1];
	//const clear = useClearMessageDispatch();
	return (payload: any, type: `success` | `error` | `any`) => {
		dispatch({
			payload: payload,
			type: type,
		});
		/*
		setTimeout(() => {
			clear();
		}, 5000).refresh();
    */
	};
};

export default MessageContext;

