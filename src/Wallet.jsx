import React, { PureComponent } from "react";
import {
  Row,
  Col,
  Card,
  List,
  Avatar,
  Button,
  Input,
  Tooltip,
  InputNumber
} from "antd";

import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import SockJsClient from "react-stomp";
import Websocket from "react-websocket";

import BaseUrl from './BaseUrl';

export default class Wallet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      availableTokens: 0,
      lockedDepositTokens: 0,
      lockedEarningTokens: 0,
    };
  }

  componentDidMount() {
    this.connection = new SockJS(BaseUrl);
    this.stompClient = webstomp.over(this.connection);
    this.stompClient.connect(
      {},
      () => {
        this.subscription = this.stompClient.subscribe(
          "/topic/transactions",
          message => {
            this.handleData(message.body);
          }
        );
        this.stompClient.send("/app/transactions", {}, {});
      }
    );
  }

  componentWillUnmount() {
    if (this.subscription !== undefined) this.subscription.unsubscribe({});
  }

  handleData = data => {
    let result = JSON.parse(data);
    console.log(result);
    if(result.hasOwnProperty('availableTokens') &&
        result.hasOwnProperty('lockedDepositTokens') &&
        result.hasOwnProperty('lockedEarningTokens')
      ){
      this.setState({
        availableTokens: result.availableTokens,
        lockedDepositTokens: result.lockedDepositTokens,
        lockedEarningTokens: result.lockedEarningTokens
      });
  }
    this.setState({ walletData: result });
  };

  render() {
    return (
      <div className="bgcolor">
        <Row>
          <Col span={8}>
            <h4>Available Token</h4>
            <h4 className="big">{this.state.availableTokens}</h4>
          </Col>
          <Col span={8}>
            <h4>Locked Deposit Token</h4>
            <h4 className="big">{this.state.lockedDepositTokens}</h4>
          </Col>
          <Col span={8}>
            <h4>Locked Earning Token</h4>
            <h4 className="big">{this.state.lockedEarningTokens}</h4>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Button type="primary">Buy Tokens</Button>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Button type="primary">Checkout Token</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
