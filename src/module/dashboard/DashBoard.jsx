import React, {Component} from 'react';
import {Avatar, Card, Col, message, Row} from 'antd';
import {Pie} from '@antv/g2plot';
import axios from "../../util/axios";

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData(() => {
            this.initCpuChart();
            this.initMemChart();
            this.initDiskChart();
        });
    }

    initCpuChart() {
        let data = [];
        data.push({type: '已使用', value: this.props.dashboard.cpu.used});
        data.push({type: '未使用', value: this.props.dashboard.cpu.free});

        let cpuPlot = new Pie(document.getElementById('cpu'), {
            forceFit: true,
            radius: 0.7,
            data: data,
            angleField: 'value',
            colorField: 'type',
            label: {
                visible: true,
                type: 'spider',
            },
        });

        cpuPlot.render();
    }

    initMemChart() {
        let data = [];
        data.push({type: '已使用', value: this.props.dashboard.mem.used});
        data.push({type: '未使用', value: this.props.dashboard.mem.free});

        let memPlot = new Pie(document.getElementById('mem'), {
            forceFit: true,
            radius: 0.7,
            data: data,
            angleField: 'value',
            colorField: 'type',
            label: {
                visible: true,
                type: 'spider',
            },
        });

        memPlot.render();
    }

    initDiskChart() {
        let data = [];
        data.push({type: '已使用', value: this.props.dashboard.disk.used});
        data.push({type: '未使用', value: this.props.dashboard.disk.free});

        let diskPlot = new Pie(document.getElementById('disk'), {
            forceFit: true,
            radius: 0.7,
            data: data,
            angleField: 'value',
            colorField: 'type',
            label: {
                visible: true,
                type: 'spider',
            },
        });

        diskPlot.render();
    }

    loadData(callback) {
        axios.get('/dashboard/info').then(response => {
            if (response.data.status) {
                this.props.save({
                    count: response.data.data.count,
                    cpu: response.data.data.cpu,
                    mem: response.data.data.mem,
                    disk: response.data.data.disk,
                    net: response.data.data.net
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
                    <Row gutter={32} className="cms-module-row">
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <div id="user" className="cms-module-info">
                                    <div className="cms-module-info-left">
                                        <Avatar size={90} icon="team" style={{backgroundColor: '#E77474'}}/>
                                    </div>
                                    <div className="cms-module-info-right">
                                        <div className="cms-module-info-title">用户数量(在线/总数)</div>
                                        <div className="cms-module-info-number">
                                            <a>{this.props.dashboard.count.online}</a>/
                                            <a>{this.props.dashboard.count.user}</a>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <div id="role" className="cms-module-info">
                                    <div className="cms-module-info-left">
                                        <Avatar size={90} icon="idcard" style={{backgroundColor: '#F5D05B'}}/>
                                    </div>
                                    <div className="cms-module-info-right">
                                        <div className="cms-module-info-title">角色数量</div>
                                        <div className="cms-module-info-number">
                                            <a>{this.props.dashboard.count.role}</a>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <div id="permission" className="cms-module-info">
                                    <div className="cms-module-info-left">
                                        <Avatar size={90} icon="apartment" style={{backgroundColor: '#FB9D62'}}/>
                                    </div>
                                    <div className="cms-module-info-right">
                                        <div className="cms-module-info-title">权限数量</div>
                                        <div className="cms-module-info-number">
                                            <a>{this.props.dashboard.count.permission}</a>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <div id="net" className="cms-module-info">
                                    <div className="cms-module-info-left">
                                        <Avatar size={90} icon="global" style={{backgroundColor: '#70BFEF'}}/>
                                    </div>
                                    <div className="cms-module-info-right">
                                        <div className="cms-module-info-title">网络流量(上传/下载)</div>
                                        <div className="cms-module-info-number">
                                            {this.props.dashboard.net.upload}/{this.props.dashboard.net.download}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={32} className="cms-module-row">
                        <Col span={8}>
                            <Card title="CPU监控" className="cms-module-card"
                                  actions={[
                                      <div className="cms-module-card-action">
                                          <div>核心数</div>
                                          <div>
                                              {this.props.dashboard.cpu.count} 个
                                          </div>
                                      </div>,
                                      <div className="cms-module-card-action">
                                          <div>使用率</div>
                                          <div>
                                              {this.props.dashboard.cpu.percent} %
                                          </div>
                                      </div>,
                                  ]}>
                                <div id="cpu" className="cms-module-chart"/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="内存监控(单位：GB)" className="cms-module-card"
                                  actions={[
                                      <div className="cms-module-card-action">
                                          <div>总大小</div>
                                          <div>
                                              {this.props.dashboard.mem.total} GB
                                          </div>
                                      </div>,
                                      <div className="cms-module-card-action">
                                          <div>已使用</div>
                                          <div>
                                              {this.props.dashboard.mem.used} GB
                                          </div>
                                      </div>,
                                      <div className="cms-module-card-action">
                                          <div>未使用</div>
                                          <div>
                                              {this.props.dashboard.mem.free} GB
                                          </div>
                                      </div>,
                                      <div className="cms-module-card-action">
                                          <div>使用率</div>
                                          <div>
                                              {this.props.dashboard.mem.percent}
                                          </div>
                                      </div>
                                  ]}>
                                <div id="mem" className="cms-module-chart"/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="磁盘监控(单位：GB)" className="cms-module-card"
                                  actions={[
                                      <div className="cms-module-card-action">
                                          <div>总大小</div>
                                          <div>
                                              {this.props.dashboard.disk.total} GB
                                          </div>
                                      </div>,
                                      <div className="cms-module-card-action">
                                          <div>已使用</div>
                                          <div>
                                              {this.props.dashboard.disk.used} GB
                                          </div>
                                      </div>,
                                      <div className="cms-module-card-action">
                                          <div>未使用</div>
                                          <div>
                                              {this.props.dashboard.disk.free} GB
                                          </div>
                                      </div>,
                                      <div className="cms-module-card-action">
                                          <div>使用率</div>
                                          <div>
                                              {this.props.dashboard.disk.percent}
                                          </div>
                                      </div>
                                  ]}>
                                <div id="disk" className="cms-module-chart"/>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default DashBoard;
