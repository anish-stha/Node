import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { message } from "antd";

import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import SockJsClient from "react-stomp";
import Websocket from "react-websocket";

import MainPage from "./MainPage";
import Wallet from "./Wallet";
import Files from "./Files";
import NodeInfo from "./NodeInfo";
import Transaction from "./Transaction";

import BaseUrl from './BaseUrl';

const { Header, Content, Footer } = Layout;

class MainPageContainer extends Component {
  componentDidMount() {
    this.connection = new SockJS(BaseUrl);
    this.stompClient = webstomp.over(this.connection);
    this.stompClient.connect(
      {},
      () => {
        this.subscription = this.stompClient.subscribe(
          "/topic/popup",
          message => {
            this.handleData(message.body);
          }
        );
        this.stompClient.send("/app/popup", "Hi! I am connected", {});
      }
    );
  }

  componentWillUnmount() {
    if (this.subscription !== undefined) this.subscription.unsubscribe({});
  }

  handleData = data => {
    console.log(data);
    message.success(data);
  };

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="nodeinfo">Node Info</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="files">Files Stored</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="wallet">My Wallet</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="transactions">Transactions</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>P2P</Breadcrumb.Item>
          </Breadcrumb>
          <Switch>
            <Route exact path="/" component={Files} />
            <Route exact path="/nodeinfo" component={NodeInfo} />
            <Route exact path="/files" component={Files} />
            <Route exact path="/wallet" component={Wallet} />
            <Route exact path="/transactions" component={Transaction} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>P2P</Footer>
      </Layout>
    );
  }
}

export default MainPageContainer;
