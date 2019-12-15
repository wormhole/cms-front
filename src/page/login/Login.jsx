import React, {Component} from 'react';
import {Button, Checkbox, Col, Form, Icon, Input, Row} from 'antd';
import './login.less';

class Login extends Component {
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
            <div className="cms-login-bg">
                <div className="cms-login-outer">
                    <h3>用户登录</h3>
                    <div className="cms-login-inner">
                        <Form onSubmit={this.handleSubmit} className="login-form">
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
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码'}],
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
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>记住我</Checkbox>)}
                            </Form.Item>
                        </Form>
                        <Button type="primary" htmlType="submit" className="cms-login-button">
                            登录
                        </Button>
                        <a href="/#/register">注册用户</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({name: 'login-form'})(Login);