import PromisePolyfill from 'promise-polyfill';
import setAsap from 'setasap';
import ErrorHandler from './ErrorHanlder';

export const usePromisePolyfill = () => {
	if (!window.Promise) {
		window.Promise = PromisePolyfill;
		window.Promise._immediateFn = setAsap;
		window.Promise._unhandledRejectionFn = ErrorHandler;
	}
};
