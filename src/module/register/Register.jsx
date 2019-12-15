import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, Row} from 'antd';
import './register.less';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="cms-register-bg">
                <div className="cms-register-outer">
                    <h3>用户注册</h3>
                    <div className="cms-register-inner">
                        <Form onSubmit={this.handleSubmit} className="register-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: '请输入用户名！'}],
                                })(
                                    <Input
                                        prefix={<Icon type="user" className='cms-icon'/>}
                                        placeholder="用户名"
                                        className='cms-input'
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: '请输入邮箱！'}],
                                })(
                                    <Input
                                        prefix={<Icon type="ie" className='cms-icon'/>}
                                        placeholder="邮箱"
                                        className='cms-input'
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('telephone', {
                                    rules: [{required: true, message: '请输入电话号码！'}],
                                })(
                                    <Input
                                        prefix={<Icon type="phone" className='cms-icon'/>}
                                        placeholder="电话号码"
                                        className='cms-input'
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码！'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" className='cms-icon'/>}
                                        type="password"
                                        placeholder="密码"
                                        className='cms-input'
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('check-password', {
                                    rules: [{required: true, message: '请确认密码！'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" className='cms-icon'/>}
                                        type="password"
                                        placeholder="确认密码"
                                        className='cms-input'
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={14}>
                                        {getFieldDecorator('vcode', {
                                            rules: [{required: true, message: '请输入验证码'}],
                                        })(
                                            <Input
                                                prefix={<Icon type="safety-certificate" className='cms-icon'/>}
                                                type="text"
                                                placeholder="验证码"
                                                className='cms-input'
                                            />,
                                        )}
                                    </Col>
                                    <Col span={10}>
                                        <img src="/api/vcode" className="cms-verify-img" id="verify-img"/>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                        <Button type="primary" htmlType="submit" className="cms-register-button">
                            注册
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({name: 'register-form'})(Register);