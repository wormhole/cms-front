import React, {Component} from "react";
import {Breadcrumb, Button, Form, Input, InputNumber, message} from "antd";
import {Link} from "react-router-dom";
import axios from "../../../util/axios";

class Add extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.location.type === undefined) {
            this.props.history.push("/auth/user");
        }
    }

    componentWillUnmount() {
        this.handleClear();
    }

    handleClear() {
        this.props.save({
            edit: {
                id: null,
                username: null,
                email: null,
                telephone: null,
                limit: 1,
                ttl: 30,
                lock: 30,
                failure: 5,
                newPassword: null,
                checkPassword: null
            }
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleSave() {
        if (this.props.location.type === "edit") {
            let param, api;
            if (this.props.location.content === "base") {
                param = {
                    id: this.props.user.edit.id,
                    username: this.props.user.edit.username,
                    email: this.props.user.edit.email,
                    telephone: this.props.user.edit.telephone,
                    ttl: this.props.user.edit.ttl,
                    lock: this.props.user.edit.lock,
                    limit: this.props.user.edit.limit,
                    failure: this.props.user.edit.failure
                }
                api = "/auth/user_manage/user";
            } else if (this.props.location.content === "password") {
                if (this.props.user.edit.newPassword !== this.props.user.edit.checkPassword) {
                    this.props.save({edit: {...this.props.user.edit, checkPassword: null}});
                    message.warning("两次密码不一致");
                    return;
                } else {
                    param = {
                        id: this.props.user.edit.id,
                        newPassword: this.props.user.edit.newPassword
                    }
                }
                api = "/auth/user_manage/user/password";
            }
            axios.put(api, param).then(result => {
                if (result.status) {
                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            }).catch(error => {

            });
        } else if (this.props.location.type === "add") {
            if (this.props.user.edit.newPassword !== this.props.user.edit.checkPassword) {
                this.props.save({edit: {...this.props.user.edit, checkPassword: null}});
                message.warning("两次密码不一致");
                return;
            }
            axios.post("/auth/user_manage/user", {
                username: this.props.user.edit.username,
                telephone: this.props.user.edit.telephone,
                email: this.props.user.edit.email,
                ttl: this.props.user.edit.ttl,
                lock: this.props.user.edit.lock,
                limit: this.props.user.edit.limit,
                failure: this.props.user.edit.failure,
                password: this.props.user.edit.newPassword
            }).then(result => {
                if (result.status === true) {
                    message.success(result.message);
                    this.handleClear();
                } else {
                    message.error(result.message);
                }
            }).catch(error => {

            });
        }
    }

    handleValueChange(key, e) {
        if (key === "lock" || key === "limit" || key === "ttl" || key === "failure") {
            this.props.save({edit: {...this.props.user.edit, [key]: e}});
        } else {
            this.props.save({edit: {...this.props.user.edit, [key]: e.target.value}});
        }
    }

    render() {
        return (

            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/user"
                                           className="cms-module-link">用户管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/user/add"
                                           className="cms-module-link">{this.props.location.type === "edit" ? "编辑" : "添加"}</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-head">
                        <Button type="primary" className="cms-module-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                        <Button type="primary" className="cms-module-button"
                                onClick={this.handleSave.bind(this)}>保存</Button>
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
                            {this.props.location.content !== "password" ?
                                <div>
                                    <Form.Item label="用户名" className="cms-module-item">
                                        <Input type="text" className="cms-module-input" placeholder="请输入用户名"
                                               value={this.props.user.edit.username}
                                               onChange={this.handleValueChange.bind(this, "username")}/>
                                    </Form.Item>
                                    <Form.Item label="邮箱" className="cms-module-item">
                                        <Input type="email" className="cms-module-input" placeholder="请输入邮箱"
                                               value={this.props.user.edit.email}
                                               onChange={this.handleValueChange.bind(this, "email")}/>
                                    </Form.Item>
                                    <Form.Item label="电话号码" className="cms-module-item">
                                        <Input type="telephone" className="cms-module-input" placeholder="请输入电话号码"
                                               value={this.props.user.edit.telephone}
                                               onChange={this.handleValueChange.bind(this, "telephone")}/>
                                    </Form.Item>
                                    <Form.Item label="会话时长" className="cms-module-item">
                                        <InputNumber min={1} value={this.props.user.edit.ttl}
                                                     formatter={value => `${value}分钟`}
                                                     parser={value => value.replace("分钟", "")}
                                                     onChange={this.handleValueChange.bind(this, "ttl")}/>
                                    </Form.Item>
                                    <Form.Item label="登录限制" className="cms-module-item">
                                        <InputNumber min={1} value={this.props.user.edit.limit}
                                                     formatter={value => `${value}次`}
                                                     parser={value => value.replace("次", "")}
                                                     onChange={this.handleValueChange.bind(this, "limit")}/>
                                    </Form.Item>
                                    <Form.Item label="锁定时长" className="cms-module-item">
                                        <InputNumber min={1} value={this.props.user.edit.lock}
                                                     formatter={value => `${value}分钟`}
                                                     parser={value => value.replace("分钟", "")}
                                                     onChange={this.handleValueChange.bind(this, "lock")}/>
                                    </Form.Item>
                                    <Form.Item label="失败次数" className="cms-module-item">
                                        <InputNumber min={3} value={this.props.user.edit.failure}
                                                     formatter={value => `${value}次`}
                                                     parser={value => value.replace("次", "")}
                                                     onChange={this.handleValueChange.bind(this, "failure")}/>
                                    </Form.Item>
                                </div> : null}
                            {this.props.location.content !== "base" ?
                                <div>
                                    <Form.Item label="密码" className="cms-module-item">
                                        <Input.Password className="cms-module-input" placeholder="请输入密码"
                                                        value={this.props.user.edit.newPassword}
                                                        onChange={this.handleValueChange.bind(this, "newPassword")}/>
                                    </Form.Item>
                                    <Form.Item label="确认密码" className="cms-module-item">
                                        <Input.Password className="cms-module-input" placeholder="请确认密码"
                                                        value={this.props.user.edit.checkPassword}
                                                        onChange={this.handleValueChange.bind(this, "checkPassword")}/>
                                    </Form.Item>
                                </div> : null}
                        </Form>
                    </div>
                </div>
            </div>
        )

    }
}

export default Add;