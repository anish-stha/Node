import React, { Component } from 'react';
import { Row, Col, Card, List, Avatar } from 'antd';
import { message } from 'antd';

import SockJsClient from 'react-stomp';
import Websocket from 'react-websocket';
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';

import BaseUrl from './BaseUrl';

export default class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesData : [],
            stats: {
                totalFileReceived: 0,
                totalFileDownloaded: 0,
                totalStorageProvided: 0,
                totalClients:  0,
            }
        };

    }

    componentDidMount(){
        this.connection = new SockJS(BaseUrl);
        this.stompClient = webstomp.over(this.connection);
        this.stompClient.connect({}, ()=>{
        this.subscriptionFiles = this.stompClient.subscribe('/topic/files', (message) => {this.handleData(message.body)});
            this.stompClient.send("/app/files",{},{}); 
        this.subscriptionStats = this.stompClient.subscribe('/topic/stats', (message) => {this.handleStats(message.body)});
            this.stompClient.send("/app/stats",{},{}) ;
        });
    }

    componentWillUnmount(){
        if(this.subscriptionFiles !== undefined)
            this.subscriptionFiles.unsubscribe({});
        if(this.subscriptionStats !== undefined)
            this.subscriptionStats.unsubscribe({});
    }


    handleStats = (stats) =>  {
        let result = JSON.parse(stats);
        console.log("*************Handling data of Files stats:", result);
        if(result!=={}){
            this.setState({stats: result});
        }  

    }

    handleData = (data) =>  {
        let result = JSON.parse(data);
        console.log("*************Handling data of Files:", result);
        if(result.length > 0){
            this.setState({filesData: result});
        }        
    }

    render() {
        console.log(this.state.filesData);
            return (
                <div className="bgcolor">
                  
                    
                    <Row >
                        <Col span={8}>
                            <h4>Storage provided</h4>
                            <h4 className="big">{(this.state.stats.totalStorageProvided).toString().substring(0,5)}</h4>
                        </Col>
                        <Col span={8}>
                            <h4>Total File Received</h4>
                            <h4 className="big">{this.state.stats.totalFileReceived}</h4>
                        </Col>
                        <Col span={8}>
                            <h4>Total File Downloaded</h4>
                            <h4 className="big">{this.state.stats.totalFileDownloaded}</h4>
                        </Col>
                    </Row>
            

                <Row gutter={24}>
                <Col xl={24} lg={24} md={12} sm={24} xs={24}>
                    <Card
                    className="card-content custom-card"
                    style={{ margin: 20, padding: 20, textAlign:'left' }}
                    title="Files Hash"
                    bordered={false}
                    loading={false}
                    bodyStyle={{ padding: 0 }}>
                        <List 
                            loading={false} 
                            size="large"
                            dataSource={this.state.filesData}
                            renderItem={item=>(
                            <List.Item key={item.file_hash}>
                            <List.Item.Meta
                                avatar={<Avatar src="http://icons.iconarchive.com/icons/zhoolego/material/256/Filetype-Docs-icon.png" />}
                                title={item.file_hash}
                                description={<div><span>{item.renewed_date} - {item.ending_date}</span></div>}/>
                                <div>
                                    <div>Current Download Count:<span>{item.current_download_count}</span></div>
                                    <div>Remaining Download Count:<span>{item.remaining_download_count}</span></div>
                                </div>
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
