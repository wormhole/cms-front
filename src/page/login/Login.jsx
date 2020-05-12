import React, {Component} from "react";
import {Button, Checkbox, Col, Form, Input, message, Row} from "antd";
import {LockOutlined, SafetyCertificateOutlined, UserOutlined} from "@ant-design/icons";
import "./login.less";
import axios from "../../util/axios";
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.handleClear();
    }

    handleClear() {
        this.props.save({
            username: null,
            password: null,
            code: null,
            rememberMe: null,
            codeApi: process.env.NODE_ENV === "production" ? "/code?" + Math.random() : "/api/code?" + Math.random()
        });
    }

    handleSubmit() {
        let param = new FormData();
        param.append("username", this.props.login.username);
        param.append("password", this.props.login.password);
        param.append("code", this.props.login.code);
        param.append("rememberMe", this.props.login.rememberMe);
        axios.post("/login", param, {headers: {"Content-Type": "multipart/form-data"},}).then(response => {
            if (response.data.status === true) {
                message.success(response.data.message);
                this.handleClear();
                this.props.history.push("/");
            } else {
                message.error(response.data.message);
                this.props.save({codeApi: process.env.NODE_ENV === "production" ? "/code?" + Math.random() : "/api/code?" + Math.random()})
            }
        }).catch(error => {
            switch (error.response.status) {
                case 401:
                    message.warning(error.response.data.message);
                    this.props.history.push("/login");
                    break;
                case 403:
                    message.error(error.response.data.message);
                    this.props.save({codeApi: this.props.login.codeApi + "?" + Math.random()});
                    break;
                default:
                    message.error(error.response.data.message);
                    this.props.save({codeApi: this.props.login.codeApi + "?" + Math.random()});
                    break;
            }
        });
    };

    handleValueChange(key, e) {
        if (key === "rememberMe") {
            this.props.save({[key]: e.target.checked});
        } else {
            this.props.save({[key]: e.target.value});
        }
    }

    handleVCodeChange() {
        this.props.save({codeApi: process.env.NODE_ENV === "production" ? "/code?" + Math.random() : "/api/code?" + Math.random()});
    }

    render() {
        return (
            <div className="cms-login">
                <div className="cms-login-outer">
                    <h3>用户登录</h3>
                    <div className="cms-login-inner">
                        <Form onFinish={this.handleSubmit.bind(this)} className="cms-login-form">
                            <Form.Item>
                                <Input
                                    prefix={<UserOutlined className="cms-login-icon"/>}
                                    placeholder="用户名"
                                    className="cms-login-input"
                                    value={this.props.login.username}
                                    onChange={this.handleValueChange.bind(this, "username")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    prefix={<LockOutlined className="cms-login-icon"/>}
                                    type="password"
                                    placeholder="密码"
                                    className="cms-login-input"
                                    value={this.props.login.password}
                                    onChange={this.handleValueChange.bind(this, "password")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={14}>
                                        <Input
                                            prefix={<SafetyCertificateOutlined className="cms-login-icon"/>}
                                            type="text"
                                            placeholder="验证码"
                                            className="cms-login-input"
                                            value={this.props.login.code}
                                            onChange={this.handleValueChange.bind(this, "code")}
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <img src={this.props.login.codeApi} className="cms-login-img"
                                             id="verify-img" onClick={this.handleVCodeChange.bind(this)}/>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <Checkbox checked={this.props.login.rememberMe}
                                          onChange={this.handleValueChange.bind(this, "rememberMe")}>记住我</Checkbox>
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="cms-login-button">
                                登录
                            </Button>
                        </Form>
                        <Link to="/register">注册用户</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;