import React, { PureComponent } from 'react';
import { Row, Col, Card, List, Avatar, Button, Input, Tooltip, InputNumber } from 'antd';


import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';
import SockJsClient from 'react-stomp';
import Websocket from 'react-websocket';

export default class Wallet extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            walletData : [],
        };  
    }
  
    componentDidMount(){
            this.connection = new SockJS('http://192.168.100.17:8080/socket');
            this.stompClient = webstomp.over(this.connection);
            this.stompClient.connect({}, ()=>{
            this.subscription = this.stompClient.subscribe('/topic/wallet', (message) => {this.handleData(message.body)});
                this.stompClient.send("/app/files",{},{}) 
            });
      }
    
      componentWillUnmount(){
          this.subscription.unsubscribe({});
      }
    
    
      handleData = (data) =>  {
          let result = JSON.parse(data);
          console.log(result);
          this.setState({walletData: result});
      }

   render() {
        return (
            <div className="bgcolor">

                <Row >
                    <Col span={8}>
                        <h4>Token Balance</h4>
                        <h4>56</h4>
                    </Col>
                    <Col span={8}>
                        <h4>Token Locked</h4>
                        <h4>8<span> / 56</span>
                    </h4>
                    </Col>
                    <Col span={8}>
                        <h4>Ethereum Balance</h4>
                        <h4>2,223</h4>
                    </Col>
                </Row>
          
            <Row gutter={24}>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  
                    <Button type='primary'>Buy Tokens</Button>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Button type='primary'>Checkout Token</Button>
                </Col>
            </Row>
        
        </div>

        );
    }
}
