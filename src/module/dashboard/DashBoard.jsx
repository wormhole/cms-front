import React, {Component} from 'react';
import {Card, Col, Row} from 'antd';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="cms-module">
                <div className="cms-module-dashboard">
                    <Row gutter={32}>
                        <Col span={8}>
                            <Card title="在线用户" className="cms-module-card">
                                <div id="online" className="cms-module-chart">

                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="用户、角色、权限统计" className="cms-module-card">
                                <div id="count" className="cms-module-chart">

                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="系统监测" className="cms-module-card">
                                <div id="system"/>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default DashBoard;
