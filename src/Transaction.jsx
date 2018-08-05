import React, { Component } from 'react';
import { Row, Col, Card, List, Avatar } from 'antd';


import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';
import SockJsClient from 'react-stomp';
import Websocket from 'react-websocket';

import BaseUrl from './BaseUrl';


export default class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions : [],
            loading: true,
        };  
    }

    componentDidMount(){
        this.connection = new SockJS(BaseUrl);
        this.stompClient = webstomp.over(this.connection);
        this.stompClient.connect({}, ()=>{
            this.subscription = this.stompClient.subscribe('/topic/transactions', (message) => {this.handleData(message.body)});
            this.stompClient.send("/app/transactions",{},{}) 
        });
    }

    componentWillUnmount(){
        if(this.subscription !== undefined)
            this.subscription.unsubscribe({});
    }


    handleData = (data) =>  {
        let result = JSON.parse(data);
        console.log("****************Handling data from Transactions:", result);
        if(result.hasOwnProperty('transactions')){
            this.setState({transactionData: result.transactions});
        }        
    }

   render() {
        return (
            <div className="bgcolor">
                <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Card
                        className="card-content custom-card"
                        style={{ margin: 20 }}
                        title="Transactions"
                        bordered={false}
                        loading={this.state.loading}
                        bodyStyle={{ padding: 0 }}>
                        <List 
                            loading={this.state.loading} 
                            size="large"
                            dataSource={this.state.transactions}
                            renderItem={item=>(
                                <List.Item key={item.hash}>
                                <List.Item.Meta
                                    title={item.hash}
                                    description={item.hash}
                                />
                               </List.Item>
                            )}
                        />
                        </Card>
                    </Col>
                </Row>
          
            </div>
        

        );
    }
}
