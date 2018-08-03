import axios from 'axios';

export default function fetchTransactions() {
  return (dispatch) => {
    dispatch({ type: 'TRANSACTION_LOG_FETCHING' });
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    // TODO: Change api
    axios.get("some api here", config)
      .then(response => dispatch({ type: 'TRANSACTION_LOG_FETCHED', payload: response.data }))
      .catch(err => dispatch({ type: 'TRANSACTION_LOG_REJECTED', payload: err }));
  };
}
