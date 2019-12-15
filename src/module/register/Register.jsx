import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, Row} from 'antd';
import './register.less';
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.get('/api/test')
            .then(res => {
                console.log(res);
            }).catch(error => {
            console.log(error);
        });
    };

    render() {
        return (
            <div className="cms-register-bg">
                <div className="cms-register-outer">
                    <h3>用户注册</h3>
                    <div className="cms-register-inner">
                        <Form onSubmit={this.handleSubmit} className="register-form">
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="user" className='cms-icon'/>}
                                    placeholder="用户名"
                                    className='cms-input'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="ie" className='cms-icon'/>}
                                    placeholder="邮箱"
                                    className='cms-input'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="phone" className='cms-icon'/>}
                                    placeholder="电话号码"
                                    className='cms-input'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" className='cms-icon'/>}
                                    type="password"
                                    placeholder="密码"
                                    className='cms-input'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" className='cms-icon'/>}
                                    type="password"
                                    placeholder="确认密码"
                                    className='cms-input'
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
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <img src="/api/vcode" className="cms-verify-img" id="verify-img"/>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="cms-register-button">
                                注册
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;