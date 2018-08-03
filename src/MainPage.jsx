import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Avatar } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';

import TransactionLog from './Components/TransactionLog/TransactionLogContainer';


const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

const members = [
  {
    id: 'members-1',
    title: '科学搬砖组',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    link: '',
  },
  {
    id: 'members-2',
    title: '程序员日常',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
    link: '',
  },
  {
    id: 'members-3',
    title: '设计天团',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
    link: '',
  },
  {
    id: 'members-4',
    title: '中二少女团',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
    link: '',
  },
  {
    id: 'members-5',
    title: '骗你学计算机',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
    link: '',
  },
];

export default class MainPage extends PureComponent {

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
