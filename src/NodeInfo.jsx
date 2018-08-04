import React, { Component } from 'react';
import { Row, Col, Card, List, Avatar } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';
import SockJsClient from 'react-stomp';
import Websocket from 'react-websocket';

export default class NodeInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
        nodeInfoData : [],
    };
  }
  
  componentDidMount(){
        this.connection = new SockJS('http://192.168.100.17:8080/socket');
        this.stompClient = webstomp.over(this.connection);
        this.stompClient.connect({}, ()=>{
        this.subscription = this.stompClient.subscribe('/topic/stats', (message) => {this.handleData(message.body)});
            this.stompClient.send("/app/stats",{},{}) 
        });
  }

  componentWillUnmount(){
      this.subscription.unsubscribe({});
  }

  handleData = (data) =>  {
    let result = JSON.parse(data);
    console.log("****************Handling data from NodeInfo:", result);
    if(result.hasOwnProperty('')){
        this.setState({transactionData: result});
    }        
  }

  renderWebsocket = () => (
    <Websocket url=''
    onMessage={this.handleData.bind(this)}/>
  );

   render() {
      const pageHeaderContent = (
        <div>
          <div>
            <p>Node id:</p>
            <p>22</p>
          </div>
          <div>
            <p>Public key</p>
            <p>3243242342325232342342fadfafaddasdas</p>
          </div>
          <div>
            <p>Private key</p>
            <p>341414124141431414141323542434352525335223523532523</p>
          </div>
        </div>
      );

      const extraContent = (
          <div></div>
      );
        return (
        <div>
            <PageHeader
                        title="Blockchain Cloud storage"
                        content={pageHeaderContent} 
                        extraContent={extraContent} />
        
        </div>

        );
    }
}
