import React, {Component} from "react";
import {Breadcrumb, Button, Form, Input, InputNumber, message} from "antd";
import {Link} from "react-router-dom";
import axios from "../../util/axios";

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
        let param = {
            id: this.props.personal.id,
            username: this.props.personal.username,
            email: this.props.personal.email,
            telephone: this.props.personal.telephone,
            ttl: this.props.personal.ttl,
            lock: this.props.personal.lock,
            limit: this.props.personal.limit,
            failure: this.props.personal.failure
        };

        axios.put("/personal/user", param).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                this.props.save({
                    id: response.data.data.id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    telephone: response.data.data.telephone,
                    ttl: response.data.data.ttl,
                    lock: response.data.data.lock,
                    limit: response.data.data.limit,
                    failure: response.data.data.failure
                });
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    loadData() {
        axios.get("/personal/user").then(response => {
            if (response.data.status) {
                this.props.save({
                    id: response.data.data.id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    telephone: response.data.data.telephone,
                    ttl: response.data.data.ttl,
                    lock: response.data.data.lock,
                    limit: response.data.data.limit,
                    failure: response.data.data.failure
                });
            } else {
                message.error(response.data.message);
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
                                                 onChange={this.handleValueChange.bind(this, "ttl")}/>
                                </Form.Item>
                                <Form.Item label="登录限制" className="cms-module-item">
                                    <InputNumber min={1} value={this.props.personal.limit}
                                                 onChange={this.handleValueChange.bind(this, "limit")}/>
                                </Form.Item>
                                <Form.Item label="锁定时长" className="cms-module-item">
                                    <InputNumber min={1} value={this.props.personal.lock}
                                                 onChange={this.handleValueChange.bind(this, "lock")}/>
                                </Form.Item>
                                <Form.Item label="失败次数" className="cms-module-item">
                                    <InputNumber min={3} value={this.props.personal.failure}
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