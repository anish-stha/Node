import { transactionLog } from '../values';

const initialState = {
  transactionLogData: transactionLog,
  fetching: false,
  fetched: false,
  error: false,
  errorMessage: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TRANSACTION_LOG_PENDING': {
      return { ...state, fetching: true };
    }
    case 'TRANSACTION_LOG_REJECTED': {
      return {
        ...state, fetching: false, error: true, errorMessage: action.payload,
      };
    }
    case 'TRANSACTION_LOG_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        transactionLogData: action.payload,
      };
    }
    default:
      return { ...state };
  }
}
