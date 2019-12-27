import React, {Component} from 'react';
import {Button, Checkbox, Col, Form, Icon, Input, message, Row} from 'antd';
import './login.less';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/login', {
            username: this.props.login.username,
            password: this.props.login.password,
            vcode: this.props.login.vcode,
            rememberMe: this.props.login.rememberMe
        }).then(response => {
            this.props.save({
                username: null,
                password: null,
                vcode: null,
                rememberMe: null
            });
            if (response.data.status === true) {
                message.success(response.data.message);
                this.props.history.push("/");
            } else {
                message.error(response.data.message);
                this.props.save({vcodeApi: "/api/vcode?" + Math.random()})
            }
        }).catch(error => {
            this.props.save({
                username: null,
                password: null,
                vcode: null,
                rememberMe: null
            });
            switch (error.response.status) {
                case 401:
                    message.warning(error.response.data.message);
                    this.props.history.push("/login");
                    break;
                case 403:
                    message.error(error.response.data.message);
                    this.props.save({vcodeApi: "/api/vcode?" + Math.random()});
                    break;
                default:
                    message.error(error.response.data.message);
                    this.props.save({vcodeApi: "/api/vcode?" + Math.random()});
                    break;
            }
        });
    };

    handleValueChange(key, e) {
        if (key === 'rememberMe') {
            this.props.save({[key]: e.target.checked});
        } else {
            this.props.save({[key]: e.target.value});
        }
    }

    handleVCodeChange() {
        this.props.save({vcodeApi: "/api/vcode?" + Math.random()})
    }

    render() {
        return (
            <div className="cms-login-bg">
                <div className="cms-login-outer">
                    <h3>用户登录</h3>
                    <div className="cms-login-inner">
                        <Form onSubmit={this.handleSubmit.bind(this)} className="cms-login-form">
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="user" className='cms-icon'/>}
                                    placeholder="用户名"
                                    className='cms-input'
                                    value={this.props.login.username}
                                    onChange={this.handleValueChange.bind(this, 'username')}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    prefix={<Icon type="lock" className='cms-icon'/>}
                                    type="password"
                                    placeholder="密码"
                                    className='cms-input'
                                    value={this.props.login.password}
                                    onChange={this.handleValueChange.bind(this, 'password')}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={14}>
                                        <Input
                                            prefix={<Icon type="safety-certificate" className='cms-icon'/>}
                                            type="text"
                                            placeholder="验证码"
                                            className='cms-input'
                                            value={this.props.login.vcode}
                                            onChange={this.handleValueChange.bind(this, 'vcode')}
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <img src={this.props.login.vcodeApi} className="cms-verify-img"
                                             id="verify-img" onClick={this.handleVCodeChange.bind(this)}/>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <Checkbox checked={this.props.login.rememberMe}
                                          onChange={this.handleValueChange.bind(this, 'rememberMe')}>记住我</Checkbox>
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="cms-login-button">
                                登录
                            </Button>
                        </Form>
                        <a href="/#/register">注册用户</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;