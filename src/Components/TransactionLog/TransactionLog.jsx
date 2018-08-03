import React from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

function TransactionLog(props) {
  return (
    <Grid>
      <Row>
        <Col sm={12} className="custom-col">
          <div className="custom-card ">
            <div className="card-header"><h4><strong>Your Wallet Transaction History</strong></h4></div>
            <div className="card-content">
                  <Table hover stried={false} bordered={false}>
                    <thead>
                      <tr>
                        {props.thArray.map((prop, key) => <th key={key}>{prop}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {props.tdArray.map((myProp, myKey) => (
                        <tr key=  {myKey}>
                          {myProp.map((mProp, mKey) => <td key={mKey}>{mProp}</td>)}
                        </tr>
                        ))}
                    </tbody>
                  </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  );
}
export default TransactionLog;
