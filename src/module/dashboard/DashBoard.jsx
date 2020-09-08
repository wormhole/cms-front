import React, {Component} from "react";
import {Avatar, Card, Col, message, Row} from "antd";
import {Bar, Donut} from "@ant-design/charts";
import {FileOutlined, IdcardOutlined, MenuOutlined, TeamOutlined} from "@ant-design/icons";
import axios from "../../util/axios";
import {Link} from "react-router-dom";
import api from "./api";

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadCount();
        this.loadUserStatus();
        this.loadDiskInfo();
        this.loadMemInfo();
    }

    loadCount() {
        axios.get(api.count).then(result => {
            if (result.status) {
                this.props.save({count: result.data});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    loadUserStatus() {
        axios.get(api.userStatus).then(result => {
            if (result.status) {
                this.props.save({status: result.data});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    loadDiskInfo() {
        axios.get(api.diskInfo).then(result => {
            if (result.status) {
                this.props.save({disk: result.data});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    loadMemInfo() {
        axios.get(api.memInfo).then(result => {
            if (result.status) {
                this.props.save({mem: result.data});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    render() {
        let status = [], disk = [], mem = [];
        status.push({数量: this.props.dashboard.status.total, 状态: "总数"});
        status.push({数量: this.props.dashboard.status.enable, 状态: "启用"});
        status.push({数量: this.props.dashboard.status.online, 状态: "在线"});
        status.push({数量: this.props.dashboard.status.disable, 状态: "禁用"});
        status.push({数量: this.props.dashboard.status.lock, 状态: "锁定"});

        disk.push({type: "已使用", value: this.props.dashboard.disk.used});
        disk.push({type: "未使用", value: this.props.dashboard.disk.free});

        mem.push({type: "已使用", value: this.props.dashboard.mem.used});
        mem.push({type: "未使用", value: this.props.dashboard.mem.free});

        const statusConfig = {
            title: {
                visible: true,
                text: "用户状态",
            },
            description: {
                visible: true,
                text: "不同状态下的用户数量统计",
            },
            forceFit: true,
            data: status,
            xField: "数量",
            yField: "状态",
            colorField: "状态",
            color: ["#427cfb"],
            label: {
                visible: true,
                position: "middle",
                formatter: (v) => v + "人",
            },
        };

        const diskConfig = {
            statistic: {
                visible: true,
                content: {
                    value: this.props.dashboard.disk.total + " GB",
                    name: "磁盘大小",
                },
            },
            legend: {
                visible: true,
                position: "bottom",
            },
            forceFit: true,
            title: {
                visible: true,
                text: "磁盘使用量",
            },
            description: {
                visible: true,
                text:
                    "磁盘使用百分比统计详情",
            },
            radius: 1,
            padding: "auto",
            data: disk,
            angleField: "value",
            colorField: "type",
            label: {
                visible: true,
                type: "inner",
                formatter: (v) => v + " GB",
            },
        };

        const memConfig = {
            statistic: {
                visible: true,
                content: {
                    value: this.props.dashboard.memory.total + " GB",
                    name: "内存大小",
                },
            },
            legend: {
                visible: true,
                position: "bottom",
            },
            forceFit: true,
            title: {
                visible: true,
                text: "内存使用量",
            },
            description: {
                visible: true,
                text:
                    "内存使用百分比统计详情",
            },
            radius: 1,
            padding: "auto",
            data: mem,
            angleField: "value",
            colorField: "type",
            label: {
                visible: true,
                type: "inner",
                formatter: (v) => v + " GB",
            },
        };
        return (
            <div className="cms-module">
                <div className="cms-module-dashboard">
                    <Row gutter={32} className="cms-module-row">
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <Card.Meta
                                    avatar={<Avatar size={90} icon={<TeamOutlined/>}
                                                    style={{backgroundColor: "#E77474"}}/>}
                                    title="用户数量"
                                    description={<Link to="#">{this.props.dashboard.count.user}</Link>}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <Card.Meta
                                    avatar={<Avatar size={90} icon={<IdcardOutlined/>}
                                                    style={{backgroundColor: "#F5D05B"}}/>}
                                    title="角色数量"
                                    description={<Link to="#">{this.props.dashboard.count.role}</Link>}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <Card.Meta
                                    avatar={<Avatar size={90} icon={<MenuOutlined/>}
                                                    style={{backgroundColor: "#FB9D62"}}/>}
                                    title="菜单数量"
                                    description={<Link to="#">{this.props.dashboard.count.menu}</Link>}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="cms-module-card">
                                <Card.Meta
                                    avatar={<Avatar size={90} icon={<FileOutlined/>}
                                                    style={{backgroundColor: "#70BFEF"}}/>}
                                    title="文件数量"
                                    description={<Link to="#">{this.props.dashboard.count.file}</Link>}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={32} className="cms-module-row">
                        <Col span={8}>
                            <Card title="用户状态统计" className="cms-module-card">
                                <div id="user" className="cms-module-chart">
                                    <Bar {...statusConfig}/>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="磁盘监控" className="cms-module-card">
                                <div id="disk" className="cms-module-chart">
                                    <Donut  {...diskConfig}/>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="内存监控" className="cms-module-card">
                                <div id="mem" className="cms-module-chart">
                                    <Donut  {...memConfig}/>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default DashBoard;