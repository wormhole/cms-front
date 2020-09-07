import React, {Component} from "react";
import {Button, Col, Form, Input, message, Row} from "antd";
import {IeOutlined, LockOutlined, PhoneOutlined, SafetyCertificateOutlined, UserOutlined} from "@ant-design/icons";
import "./register.less";
import axios from "../../util/axios";
import {Link} from "react-router-dom";
import getUrl from "../../util/url";
import api from "./api";

class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.handleClear();
    }

    handleClear() {
        this.props.save({
            captchaApi: getUrl(api.captcha + "?" + Math.random()),
            username: null,
            telephone: null,
            email: null,
            captcha: null,
            password: null,
            checkPassword: null
        });
    }

    handleSubmit() {
        axios.post(api.register, {
            username: this.props.register.username,
            telephone: this.props.register.telephone,
            email: this.props.register.email,
            password: this.props.register.password,
        }, {
            params: {
                captcha: this.props.register.captcha
            }
        }).then(result => {
            if (result.status === true) {
                message.success(result.message);
                this.handleClear();
            } else {
                message.error(result.message);
                this.props.save({
                    captchaApi: getUrl(api.captcha + "?" + Math.random())
                });
            }
        }).catch(error => {

        });
    };

    handleValueChange(key, e) {
        this.props.save({[key]: e.target.value});
    }

    handleCaptchaChange() {
        this.props.save({
            captchaApi: getUrl(api.captcha + "?" + Math.random())
        });
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
                                            value={this.props.register.captcha}
                                            onChange={this.handleValueChange.bind(this, "captcha")}
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <img src={this.props.register.captchaApi} className="cms-register-img"
                                             id="verify-img" onClick={this.handleCaptchaChange.bind(this)}/>
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