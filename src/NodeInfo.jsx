import React, { Component } from "react";
import { Row, Col, Card, List, Avatar } from "antd";
import PageHeader from "ant-design-pro/lib/PageHeader";

import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import SockJsClient from "react-stomp";
import Websocket from "react-websocket";

import BaseUrl from "./BaseUrl";

export default class NodeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        totalClients: 0,
        routingTable: []
      }
    };
  }

  componentDidMount() {
    this.connection = new SockJS(BaseUrl);
    this.stompClient = webstomp.over(this.connection);
    this.stompClient.connect(
      {},
      () => {
        this.subscription = this.stompClient.subscribe(
          "/topic/stats",
          message => {
            this.handleData(message.body);
          }
        );
        this.stompClient.send("/app/stats", {}, {});
        this.subscription = this.stompClient.subscribe(
          "/topic/routingtable",
          message => {
            this.handleRoutingTable(message.body);
          }
        );
        this.stompClient.send("/app/routingtable", {}, {});
      }
    );
  }

  componentWillUnmount() {
    if (this.subscription !== undefined) this.subscription.unsubscribe({});
  }

  handleData = data => {
    let result = JSON.parse(data);
    console.log("****************Handling data from NodeInfo:", result);
    if (result.hasOwnProperty('totalClients')) {
      this.setState({ stats: result });
    }
  };

  handleRoutingTable = data => {
    let result = JSON.parse(data);
    console.log("****************Handling Routing Table", result);
    if (result.hasOwnProperty("nodeInfo")) {
      this.setState({ routingTable: result.nodeInfo });
    }
  };

  render() {
    const pageHeaderContent = (
      <Row gutter={24}>
        <Col sm={16}>
          <div>
            <div>
              <p>Node id: node5</p>
            </div>
          </div>
        </Col>
        <Col sm={8}>
        </Col>
      </Row>
    );

    const extraContent = (
      <div>
          <h3 style={{textAlign: 'center'}}>Total Clients</h3 >
          <p className="medium" style={{textAlign: 'center'}}>{this.state.stats.totalClients}</p>
          </div>

    );
    return (
      <div>
        <PageHeader
          title="Blockchain Cloud storage"
          content={pageHeaderContent}
          extraContent={extraContent}
        />

        <br />
        <br />
        <h3>Live Nodes:</h3>
        <br />
        <List
          grid={{ gutter: 24, column: 4 }}
          dataSource={this.state.routingTable}
          renderItem={item => (
            <List.Item>
              <Card title={item.key} >
                <h5>{item.inetAddress}:{item.port}</h5>
              </Card>
            </List.Item>
          )}
        />,
      </div>
    );
  }
}
