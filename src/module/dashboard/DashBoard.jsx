import React, {Component} from 'react';
import {Card, Col, message, Row} from 'antd';
import {Column} from '@antv/g2plot';
import axios from "../../util/axios";

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData(this.initCount.bind(this));
    }

    initCount() {
        let columnPlot = new Column(document.getElementById('count'), {
            forceFit: true,
            data: this.props.dashboard.count,
            padding: 'auto',
            xField: 'type',
            yField: 'count',
            meta: {
                type: {
                    alias: '类别',
                },
                count: {
                    alias: '数量',
                },
            },
            label: {
                visible: true,
                position: 'middle',
            },
        });
        columnPlot.render();
    }

    loadData(callback) {
        axios.get('/dashboard/info').then(response => {
            if (response.data.status) {
                this.props.save({
                    count: response.data.data.count
                });
                callback();
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {
            switch (error.response.status) {
                case 401:
                    message.warning(error.response.data.message);
                    this.props.history.push("/login");
                    break;
                case 403:
                    message.error(error.response.data.message);
                    break;
                default:
                    message.error(error.response.data.message);
                    break;
            }
        });
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
