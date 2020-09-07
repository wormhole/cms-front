import React, {Component} from "react";
import {Breadcrumb, Button, Form, Input, InputNumber, message} from "antd";
import {Link} from "react-router-dom";
import axios from "../../util/axios";
import api from "./api";

class Personal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    handleValueChange(key, e) {
        if (key === "lock" || key === "limit" || key === "ttl" || key === "failure") {
            this.props.save({[key]: e})
        } else {
            this.props.save({[key]: e.target.value});
        }
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleUpdate() {
        axios.put(api.update, this.props.personal).then(result => {
            if (result.status) {
                message.success(result.message);
                this.props.save({...result.data});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    loadData() {
        axios.get(api.query).then(result => {
            if (result.status) {
                this.props.save({...result.data});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    render() {
        return (
            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/personal"
                                           className="cms-module-link">个人信息</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-head">
                        <Button type="primary" className="cms-module-button"
                                onClick={this.handleUpdate.bind(this)}>保存</Button>
                        <Button type="primary" className="cms-module-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                    </div>
                    <div className="cms-module-body">
                        <Form {...{
                            labelCol: {
                                xs: {span: 2},
                                sm: {span: 2}
                            },
                            wrapperCol: {
                                xs: {span: 8},
                                sm: {span: 8}
                            }
                        }} className="cms-module-form">
                            <div>
                                <Form.Item label="用户名" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入用户名"
                                           value={this.props.personal.username}
                                           onChange={this.handleValueChange.bind(this, "username")}/>
                                </Form.Item>
                                <Form.Item label="邮箱" className="cms-module-item">
                                    <Input type="email" className="cms-module-input" placeholder="请输入邮箱"
                                           value={this.props.personal.email}
                                           onChange={this.handleValueChange.bind(this, "email")}/>
                                </Form.Item>
                                <Form.Item label="电话号码" className="cms-module-item">
                                    <Input type="telephone" className="cms-module-input" placeholder="请输入电话号码"
                                           value={this.props.personal.telephone}
                                           onChange={this.handleValueChange.bind(this, "telephone")}/>
                                </Form.Item>
                                <Form.Item label="会话时长" className="cms-module-item">
                                    <InputNumber min={1} value={this.props.personal.ttl}
                                                 formatter={value => `${value}分钟`}
                                                 parser={value => value.replace("分钟", "")}
                                                 onChange={this.handleValueChange.bind(this, "ttl")}/>
                                </Form.Item>
                                <Form.Item label="登录限制" className="cms-module-item">
                                    <InputNumber min={1} value={this.props.personal.limit}
                                                 formatter={value => `${value}次`}
                                                 parser={value => value.replace("次", "")}
                                                 onChange={this.handleValueChange.bind(this, "limit")}/>
                                </Form.Item>
                                <Form.Item label="锁定时长" className="cms-module-item">
                                    <InputNumber min={1} value={this.props.personal.lock}
                                                 formatter={value => `${value}分钟`}
                                                 parser={value => value.replace("分钟", "")}
                                                 onChange={this.handleValueChange.bind(this, "lock")}/>
                                </Form.Item>
                                <Form.Item label="失败次数" className="cms-module-item">
                                    <InputNumber min={3} value={this.props.personal.failure}
                                                 formatter={value => `${value}次`}
                                                 parser={value => value.replace("次", "")}
                                                 onChange={this.handleValueChange.bind(this, "failure")}/>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )

    }
}

export default Personal;