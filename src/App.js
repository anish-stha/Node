import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';


import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import MainPage from './MainPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div className="App">
            <MainPage />
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
