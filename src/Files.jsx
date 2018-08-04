import React, { Component } from 'react';
import { Row, Col, Card, List, Avatar } from 'antd';

import { message } from 'antd';
import SockJsClient from 'react-stomp';

import Websocket from 'react-websocket';

import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';


export default class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesData : [],
        };

    }

    componentDidMount(){
        this.connection = new SockJS('http://192.168.100.17:8080/socket');
        this.stompClient = webstomp.over(this.connection);
        this.stompClient.connect({}, ()=>{
        this.subscription = this.stompClient.subscribe('/topic/files', (message) => {this.handleData(message.body)});
            this.stompClient.send("/app/files",{},{}) 
        });
    }

    componentWillUnmount(){
        this.subscription.unsubscribe({});
    }


    handleData = (data) =>  {
        let result = JSON.parse(data);
        console.log("*************Handling data of Files:", result);
        if(result.hasOwnProperty('files')){
            this.setState({filesData: result});
        }        
    }

    render() {
            return (
                <div className="bgcolor">
                  
                    
                    <Row >
                        <Col span={12}>
                            <h4>Space used</h4>
                            <h4>56</h4>
                        </Col>
                        <Col span={12}>
                            <h4>Number of files stored</h4>
                            <h4>8<span> / 24</span>
                        </h4>
                        </Col>
                    </Row>
            

                <Row gutter={24}>
                <Col xl={24} lg={24} md={12} sm={24} xs={24}>
                    <Card
                    className="card-content custom-card"
                    style={{ margin: 20 }}
                    title="Files Hash"
                    bordered={false}
                    loading={true}
                    bodyStyle={{ padding: 0 }}>
                        <List loading={true} size="large">
                            
                        </List>
                    </Card>
                </Col>
                </Row>            
            </div>

            );
        }
}
