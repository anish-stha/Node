import { combineReducers } from 'C:/Users/anish/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';

import TransactionLogReducer from './TransactionLogReducer';

const rootReducer = combineReducers({
  TransactionLog: TransactionLogReducer
});

export default rootReducer;

