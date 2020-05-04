import React, {Component} from "react";
import {Button, Col, Form, Input, message, Row} from "antd";
import {IeOutlined, LockOutlined, PhoneOutlined, SafetyCertificateOutlined, UserOutlined} from "@ant-design/icons";
import "./register.less";
import axios from "../../util/axios";
import {Link} from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.handleClear();
    }

    handleClear() {
        this.props.save({
            vcodeApi: process.env.NODE_ENV === "production" ? "/vcode?" : "/api/vcode?" + Math.random(),
            username: null,
            telephone: null,
            email: null,
            vcode: null,
            password: null,
            checkPassword: null
        });
    }

    handleSubmit() {
        axios.post("/register", {
            username: this.props.register.username,
            telephone: this.props.register.telephone,
            email: this.props.register.email,
            vcode: this.props.register.vcode,
            password: this.props.register.password,
        }).then(response => {
            if (response.data.status === true) {
                message.success(response.data.message);
                this.handleClear();
            } else {
                message.error(response.data.message);
                this.props.save({
                    vcodeApi: process.env.NODE_ENV === "production" ? "/vcode?" + Math.random() : "/api/vcode?" + Math.random()
                });
            }
        }).catch(error => {
            switch (error.response.status) {
                case 401:
                    message.warning(error.response.data.message);
                    this.props.history.push("/login");
                    break;
                case 403:
                    message.error(error.response.data.message);
                    this.props.save({vcodeApi: this.props.login.vcodeApi + "?" + Math.random()});
                    break;
                default:
                    message.error(error.response.data.message);
                    this.props.save({vcodeApi: this.props.login.vcodeApi + "?" + Math.random()});
                    break;
            }
        });
    };

    handleValueChange(key, e) {
        this.props.save({[key]: e.target.value});
    }

    handleVCodeChange() {
        this.props.save({vcodeApi: process.env.NODE_ENV === "production" ? "/vcode?" + Math.random() : "/api/vcode?" + Math.random()});
    }

    render() {
        return (
            <div className="cms-register">
                <div className="cms-register-outer">
                    <h3>用户注册</h3>
                    <div className="cms-register-inner">
                        <Form onFinish={this.handleSubmit.bind(this)} className="cms-register-form">
                            <Form.Item>
                                <Input
                                    prefix={<UserOutlined className="cms-register-icon"/>}
                                    placeholder="用户名"
                                    className="cms-register-input"
                                    value={this.props.register.username}
                                    onChange={this.handleValueChange.bind(this, "username")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<IeOutlined className="cms-register-icon"/>}
                                    placeholder="邮箱"
                                    className="cms-register-input"
                                    value={this.props.register.email}
                                    onChange={this.handleValueChange.bind(this, "email")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<PhoneOutlined className="cms-register-icon"/>}
                                    placeholder="电话号码"
                                    className="cms-register-input"
                                    value={this.props.register.telephone}
                                    onChange={this.handleValueChange.bind(this, "telephone")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<LockOutlined className="cms-register-icon"/>}
                                    type="password"
                                    placeholder="密码"
                                    className="cms-register-input"
                                    value={this.props.register.password}
                                    onChange={this.handleValueChange.bind(this, "password")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<LockOutlined className="cms-register-icon"/>}
                                    type="password"
                                    placeholder="确认密码"
                                    className="cms-register-input"
                                    value={this.props.register.checkPassword}
                                    onChange={this.handleValueChange.bind(this, "checkPassword")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={14}>
                                        <Input
                                            prefix={<SafetyCertificateOutlined className="cms-register-icon"/>}
                                            type="text"
                                            placeholder="验证码"
                                            className="cms-register-input"
                                            value={this.props.register.vcode}
                                            onChange={this.handleValueChange.bind(this, "vcode")}
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <img src={this.props.register.vcodeApi} className="cms-register-img"
                                             id="verify-img" onClick={this.handleVCodeChange.bind(this)}/>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="cms-register-button">
                                注册
                            </Button>
                        </Form>
                        <Link to="/login">回到登录页面</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;