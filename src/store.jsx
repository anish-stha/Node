import { applyMiddleware, createStore } from 'C:/Users/anish/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './Reducers/rootReducer';

const loggerMiddleware = createLogger();

const middleware = applyMiddleware(promiseMiddleware(), thunk, loggerMiddleware);

const store = createStore(rootReducer, middleware);

export default store;
