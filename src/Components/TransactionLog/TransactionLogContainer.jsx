import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Grid } from 'react-bootstrap';
import Websocket from 'react-websocket';

import TransactionLogActions from '../../Actions/TransactionLogActions';
import TransactionLog from './TransactionLog';


/* -------------------- Redux store to props --------------------*/
function mapStateToProps(state) {
  return ({
    thArray: state.TransactionLog.transactionLogData.thArray,
    tdArray: state.TransactionLog.transactionLogData.tdArray,
    fetching: state.TransactionLog.fetching,
    fetched: state.TransactionLog.fetched,
    error: state.TransactionLog.error,
  });
}

/* -------------------- Smart Component that interacts with redux store--------------------*/
export class TransactionLogContainer extends Component {
  componentWillMount() {
    this.props.dispatch(TransactionLogActions());
  }

  handleData = (data) =>  {
    let result = JSON.parse(data);
    this.setState({count: this.state.count + result.movement});
  }



  render() {
    if (this.props.fetching) {
      return (
        <div>
          <div className="loader"><Spin size="large" /></div>
        </div>
      );
    } else if (this.props.fetched) {
      return (
        <div>
          <div className="content-wrapper-container">
            <div className="content-wrapper-header content-wrapper-gradient" />
          </div>

          <Grid>
            <Grid>
              <TransactionLog thArray={this.props.thArray} tdArray={this.props.tdArray} />
            </Grid>
          </Grid>
        </div>
      );
    } else if (this.props.error) {
      return (
        <div>
          <div className="content-wrapper-container">
            <div className="content-wrapper-header content-wrapper-gradient" />
          </div>

          <Grid>
            <Grid>
              <TransactionLog thArray={this.props.thArray} tdArray={this.props.tdArray} />
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <div className="content-wrapper-container">
          <div className="content-wrapper-header content-wrapper-gradient" />
        </div>
            <TransactionLog thArray={this.props.thArray} tdArray={this.props.tdArray} />
      </div>
    );
  }
}

/* -------------------- Connect and export --------------------*/
export default connect(mapStateToProps)(TransactionLogContainer);
