import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import {  BrowserRouter } from 'react-router-dom'


import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import MainPage from './MainPageContainer';

class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
              <div className="App">
                <MainPage />
              </div>
            </React.Fragment>
          </BrowserRouter> 
      </Provider>
    );
  }
}

export default App;
