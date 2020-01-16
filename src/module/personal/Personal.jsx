import React, {Component} from 'react';
import {Breadcrumb, Button, Form, Input, message} from 'antd';
import {Link} from 'react-router-dom';
import axios from "../../util/axios";

class Add extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/personal/info').then(response => {
            console.log(response.data);
            if (response.data.status) {

                this.props.save({
                    id: response.data.data.id,
                    username: response.data.data.username,
                    email: response.data.data.email,
                    telephone: response.data.data.telephone
                });
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {
            switch (error.response.status) {
                case 401:
                    message.warning(error.response.data.message);
                    this.props.history.push("/login");
                    break;
                case 403:
                    message.error(error.response.data.message);
                    break;
                default:
                    message.error(error.response.data.message);
                    break;
            }
        });
    }

    componentWillUnmount() {
        this.props.save({
            id: null,
            username: null,
            email: null,
            telephone: null,
            password: null,
            checkPassword: null
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleUpdatePassword() {

        if (this.props.personal.password !== this.props.personal.checkPassword) {
            message.error("两次密码不一致");
            return;
        }

        let param = {
            password: this.props.personal.password,
            type: 1
        };

        axios.put('/personal/update', param).then(response => {
            if (response.data.status === true) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {
            switch (error.response.status) {
                case 401:
                    message.warning(error.response.data.message);
                    this.props.history.push("/login");
                    break;
                case 403:
                    message.error(error.response.data.message);
                    break;
                default:
                    message.error(error.response.data.message);
                    break;
            }
        });
    }

    handleUpdateBase() {

        let param = {
            username: this.props.personal.username,
            email: this.props.personal.email,
            telephone: this.props.personal.telephone,
            type: 0
        };

        axios.put("/personal/update", param).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {
            switch (error.response.status) {
                case 401:
                    message.warning(error.response.data.message);
                    this.props.history.push("/login");
                    break;
                case 403:
                    message.error(error.response.data.message);
                    break;
                default:
                    message.error(error.response.data.message);
                    break;
            }
        });
    }

    handleValueChange(key, e) {
        this.props.save({[key]: e.target.value});
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
                    <div className="cms-module-tool">
                        <Button type="primary" className="cms-module-tool-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                    </div>
                    <div className="cms-module-main">
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
                                <Form.Item label="用户名" className="cms-module-form-item">
                                    <Input type="text" className="cms-module-form-input" placeholder="请输入用户名"
                                           value={this.props.personal.username}
                                           onChange={this.handleValueChange.bind(this, 'username')}/>
                                </Form.Item>
                                <Form.Item label="邮箱" className="cms-module-form-item">
                                    <Input type="email" className="cms-module-form-input" placeholder="请输入邮箱"
                                           value={this.props.personal.email}
                                           onChange={this.handleValueChange.bind(this, 'email')}/>
                                </Form.Item>
                                <Form.Item label="电话号码" className="cms-module-form-item">
                                    <Input type="telephone" className="cms-module-form-input" placeholder="请输入电话号码"
                                           value={this.props.personal.telephone}
                                           onChange={this.handleValueChange.bind(this, 'telephone')}/>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-form-item">
                                    <Button type="primary" onClick={this.handleUpdateBase.bind(this)}>修改基本信息</Button>
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item label="密码" className="cms-module-form-item">
                                    <Input.Password className="cms-module-form-input" placeholder="请输入密码"
                                                    value={this.props.personal.password}
                                                    onChange={this.handleValueChange.bind(this, 'password')}/>
                                </Form.Item>
                                <Form.Item label="确认密码" className="cms-module-form-item">
                                    <Input.Password className="cms-module-form-input" placeholder="请确认密码"
                                                    value={this.props.personal.checkPassword}
                                                    onChange={this.handleValueChange.bind(this, 'checkPassword')}/>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-form-item">
                                    <Button type="primary" onClick={this.handleUpdatePassword.bind(this)}>修改密码</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )

    }
}

export default Add;