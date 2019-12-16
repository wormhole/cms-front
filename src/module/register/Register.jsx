import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, message, Row} from 'antd';
import './register.less';
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);
        console.log(props.register);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/register', {
            username: this.props.register.username,
            telephone: this.props.register.telephone,
            email: this.props.register.email,
            vcode: this.props.register.vcode,
            password: this.props.register.password,
            checkPassword: this.props.register.checkPassword
        }).then(res => {
            if (res.data.status) {
                message.success(res.data.message);
                this.props.save({vcodeApi: '/api/vcode?' + Math.random()});
            } else {
                message.error(res.data.message);
                this.props.save({vcodeApi: '/api/vcode?' + Math.random()});
            }
        }).catch(error => {
            message.error("服务器错误");
            this.props.save({vcodeApi: '/api/vcode?' + Math.random()});
        });
    };

    onValueChange(key, e) {
        this.props.save({[key]: e.target.value});
    }

    onVCodeChange() {
        this.props.save({vcodeApi: '/api/vcode?' + Math.random()});
    }

    render() {
        return (
            <div className="cms-register-bg">
                <div className="cms-register-outer">
                    <h3>用户注册</h3>
                    <div className="cms-register-inner">
                        <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="user" className='cms-icon'/>}
                                    placeholder="用户名"
                                    className='cms-input'
                                    value={this.props.register.username}
                                    onChange={this.onValueChange.bind(this, 'username')}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="ie" className='cms-icon'/>}
                                    placeholder="邮箱"
                                    className='cms-input'
                                    value={this.props.register.email}
                                    onChange={this.onValueChange.bind(this, 'email')}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="phone" className='cms-icon'/>}
                                    placeholder="电话号码"
                                    className='cms-input'
                                    value={this.props.register.telephone}
                                    onChange={this.onValueChange.bind(this, 'telephone')}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" className='cms-icon'/>}
                                    type="password"
                                    placeholder="密码"
                                    className='cms-input'
                                    value={this.props.register.password}
                                    onChange={this.onValueChange.bind(this, 'password')}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" className='cms-icon'/>}
                                    type="password"
                                    placeholder="确认密码"
                                    className='cms-input'
                                    value={this.props.register.checkPassword}
                                    onChange={this.onValueChange.bind(this, 'checkPassword')}
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
                                            value={this.props.register.vcode}
                                            onChange={this.onValueChange.bind(this, 'vcode')}
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <img src={this.props.register.vcodeApi} className="cms-verify-img"
                                             id="verify-img" onClick={this.onVCodeChange.bind(this)}/>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="cms-register-button">
                                注册
                            </Button>
                        </Form>
                        <a href="/#/login">回到登录界面</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;