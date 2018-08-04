import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Avatar } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import Websocket from 'react-websocket';
import TransactionLog from './Components/TransactionLog/TransactionLogContainer';
export default class MainPage extends PureComponent {

  
  handleData = (data) =>  {
    let result = JSON.parse(data);
    // this.setState({count: this.state.count + result.movement});
  }

  renderWebsocket = () => (
    <Websocket url='transactionurl'
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
            <div className="bgcolor">
        <PageHeader
            title="Blockchain Cloud storage"
            content={pageHeaderContent} 
            extraContent={extraContent} />
            <div className="custom-card card-content" >
                <Row>
                    <Col span={8}>
                        <h4>Space used</h4>
                        <h4>56</h4>
                    </Col>
                    <Col span={8}>
                        <h4>Number of files stored</h4>
                        <h4>8<span> / 24</span>
                    </h4>
                    </Col>
                    <Col span={8}>
                        <h4>Token locked</h4>
                        <h4>2,223</h4>
                    </Col>
                </Row>
            </div>
          

            <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
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

             <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Card
                className="card-content custom-card"
                style={{ margin: 20 }}
                title="Transaction"
                bordered={false}
                loading={true}
                bodyStyle={{ padding: 0 }}>
                    <List loading={true} size="large">
                    </List>
                </Card>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Card
                 className="card-content custom-card"
                style={{ margin: 20 }}
                title="Wallet"
                loading={true}
                bordered={false}
                bodyStyle={{ padding: 0 }}
                >
                </Card>

                <Card
                className="card-content custom-card"
                style={{ margin: 24 }}
                bordered={false}
                title="Checkout"
                loading={false}>
                </Card>
            </Col>
            </Row>
            </div>

        );
    }
}
