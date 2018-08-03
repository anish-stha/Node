import { combineReducers } from 'redux';

import TransactionLogReducer from './TransactionLogReducer';

const rootReducer = combineReducers({
  TransactionLog: TransactionLogReducer
});

export default rootReducer;

