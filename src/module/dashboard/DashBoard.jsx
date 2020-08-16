import React, {Component} from "react";
import {Avatar, Card, Col, message, Row, Statistic} from "antd";
import {Pie} from "@antv/g2plot";
import {ApartmentOutlined, GlobalOutlined, IdcardOutlined, TeamOutlined} from "@ant-design/icons";
import axios from "../../util/axios";
import {Link} from "react-router-dom";

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
        let refresh = window.setInterval(() => {
            this.loadData(() => {
                this.initCpuChart();
                this.initMemChart();
                this.initDiskChart();
            });
        }, 10000);
        this.props.save({refresh: refresh});
    }

    componentWillUnmount() {
        window.clearInterval(this.props.dashboard.refresh);
        this.props.save({cpuPlot: null, memPlot: null, diskPlot: null});
    }

    initCpuChart() {
        let data = [];
        data.push({type: "已使用", value: this.props.dashboard.cpu.used});
        data.push({type: "未使用", value: this.props.dashboard.cpu.free});
        this.props.save({cpuData: data});

        if (!this.props.dashboard.cpuPlot) {
            let cpuPlot = new Pie(document.getElementById("cpu"), {
                forceFit: true,
                radius: 0.8,
                data: this.props.dashboard.cpuData,
                angleField: "value",
                colorField: "type",
                label: {
                    visible: true,
                    type: "spider",
                },
            });
            this.props.save({cpuPlot: cpuPlot});
            this.props.dashboard.cpuPlot.render();
        }
    }

    initMemChart() {
        let data = [];
        data.push({type: "已使用", value: this.props.dashboard.mem.used});
        data.push({type: "未使用", value: this.props.dashboard.mem.free});
        this.props.save({memData: data});

        if (!this.props.dashboard.memPlot) {
            let memPlot = new Pie(document.getElementById("mem"), {
                forceFit: true,
                radius: 0.8,
                data: data,
                angleField: "value",
                colorField: "type",
                label: {
                    visible: true,
                    type: "spider",
                },
            });
            this.props.save({memPlot: memPlot});
            this.props.dashboard.memPlot.render();
        }
    }

    initDiskChart() {
        let data = [];
        data.push({type: "已使用", value: this.props.dashboard.disk.used});
        data.push({type: "未使用", value: this.props.dashboard.disk.free});
        this.props.save({diskData: data});

        if (!this.props.dashboard.diskPlot) {
            let diskPlot = new Pie(document.getElementById("disk"), {
                forceFit: true,
                radius: 0.8,
                data: data,
                angleField: "value",
                colorField: "type",
                label: {
                    visible: true,
                    type: "spider",
                },
            });
            this.props.save({diskPlot: diskPlot});
            this.props.dashboard.diskPlot.render();
        }
    }

    loadData(callback) {
        axios.get("/dashboard").then(response => {
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
                                    <div className="cms-module-left">
                                        <Avatar size={90} icon={<TeamOutlined/>} style={{backgroundColor: "#E77474"}}/>
                                    </div>
                                    <div className="cms-module-right">
                                        <div className="cms-module-title">用户数量</div>
                                        <div className="cms-module-number">
                                            <Link to="#">{this.props.dashboard.count.user}</Link>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <div id="role" className="cms-module-info">
                                    <div className="cms-module-left">
                                        <Avatar size={90} icon={<IdcardOutlined/>}
                                                style={{backgroundColor: "#F5D05B"}}/>
                                    </div>
                                    <div className="cms-module-right">
                                        <div className="cms-module-title">角色数量</div>
                                        <div className="cms-module-number">
                                            <Link to="#">{this.props.dashboard.count.role}</Link>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <div id="permission" className="cms-module-info">
                                    <div className="cms-module-left">
                                        <Avatar size={90} icon={<ApartmentOutlined/>}
                                                style={{backgroundColor: "#FB9D62"}}/>
                                    </div>
                                    <div className="cms-module-right">
                                        <div className="cms-module-title">权限数量</div>
                                        <div className="cms-module-number">
                                            <Link
                                                to="#">{this.props.dashboard.count.permission}</Link>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <div id="net" className="cms-module-info">
                                    <div className="cms-module-left">
                                        <Avatar size={90} icon={<GlobalOutlined/>}
                                                style={{backgroundColor: "#70BFEF"}}/>
                                    </div>
                                    <div className="cms-module-right">
                                        <div className="cms-module-title">流量（上传/下载）</div>
                                        <div className="cms-module-number">
                                            <Link to="#">{this.props.dashboard.net.upload}</Link>/<Link
                                            to="#">{this.props.dashboard.net.download}</Link>
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
                                      <Statistic title="核心数" value={this.props.dashboard.cpu.count}/>,
                                      <Statistic title="使用率" value={this.props.dashboard.cpu.percent}/>
                                  ]}>
                                <div id="cpu" className="cms-module-chart"/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="内存监控(单位：GB)" className="cms-module-card"
                                  actions={[
                                      <Statistic title="总大小" value={this.props.dashboard.mem.total}/>,
                                      <Statistic title="已使用" value={this.props.dashboard.mem.used}/>,
                                      <Statistic title="未使用" value={this.props.dashboard.mem.free}/>,
                                      <Statistic title="使用率" value={this.props.dashboard.mem.percent}/>
                                  ]}>
                                <div id="mem" className="cms-module-chart"/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="磁盘监控(单位：GB)" className="cms-module-card"
                                  actions={[
                                      <Statistic title="总大小" value={this.props.dashboard.disk.total}/>,
                                      <Statistic title="已使用" value={this.props.dashboard.disk.used}/>,
                                      <Statistic title="未使用" value={this.props.dashboard.disk.free}/>,
                                      <Statistic title="使用率" value={this.props.dashboard.disk.percent}/>
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