import React, {Component} from 'react';
import {Breadcrumb, Button, Form, Input, message} from 'antd';
import {Link} from 'react-router-dom';
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
        this.props.save({
            editUser: {
                id: null,
                username: null,
                email: null,
                telephone: null,
                password: null,
                checkPassword: null
            }
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleSave() {
        if (this.props.location.type === 'edit') {
            let param;
            if (this.props.location.content === 'base') {
                param = {
                    id: this.props.user.editUser.id,
                    username: this.props.user.editUser.username,
                    email: this.props.user.editUser.email,
                    telephone: this.props.user.editUser.telephone,
                    type: 0
                }
            } else if (this.props.location.content === 'password') {
                if (this.props.user.editUser.password !== this.props.user.editUser.checkPassword) {
                    this.props.save({editUser: {...this.props.user.editUser, checkPassword: null}});
                    message.warning("两次密码不一致");
                    return;
                } else {
                    param = {
                        id: this.props.user.editUser.id,
                        password: this.props.user.editUser.password,
                        type: 1
                    }
                }
            }
            axios.put("/auth/user/update", param).then(response => {
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
        } else if (this.props.location.type === 'add') {
            axios.post('/auth/user/add', {
                username: this.props.user.editUser.username,
                telephone: this.props.user.editUser.telephone,
                email: this.props.user.editUser.email,
                password: this.props.user.editUser.password
            }).then(response => {
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
    }

    handleValueChange(key, e) {
        this.props.save({editUser: {...this.props.user.editUser, [key]: e.target.value}});
    }

    render() {
        return (

            <div className="cms-page">
                <Breadcrumb className="cms-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/user" className="cms-link">用户管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/user/add"
                                           className="cms-link">{this.props.location.type === 'edit' ? '编辑' : '添加'}</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-body">
                    <div className="cms-button-group">
                        <Button type="primary" className="cms-button-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                        <Button type="primary" className="cms-button" onClick={this.handleSave.bind(this)}>保存</Button>
                    </div>
                    <Form {...{
                        labelCol: {
                            xs: {span: 2},
                            sm: {span: 2}
                        },
                        wrapperCol: {
                            xs: {span: 8},
                            sm: {span: 8}
                        }
                    }} className="cms-form">
                        {this.props.location.content !== 'password' ?
                            <div>
                                <Form.Item label="用户名" className="cms-form-item">
                                    <Input type="text" className="cms-input" placeholder="请输入用户名"
                                           value={this.props.user.editUser.username}
                                           onChange={this.handleValueChange.bind(this, 'username')}/>
                                </Form.Item>
                                <Form.Item label="邮箱" className="cms-form-item">
                                    <Input type="email" className="cms-input" placeholder="请输入邮箱"
                                           value={this.props.user.editUser.email}
                                           onChange={this.handleValueChange.bind(this, 'email')}/>
                                </Form.Item>
                                <Form.Item label="电话号码" className="cms-form-item">
                                    <Input type="telephone" className="cms-input" placeholder="请输入电话号码"
                                           value={this.props.user.editUser.telephone}
                                           onChange={this.handleValueChange.bind(this, 'telephone')}/>
                                </Form.Item>
                            </div> : null}
                        {this.props.location.content !== 'base' ?
                            <div>
                                <Form.Item label="密码" className="cms-form-item">
                                    <Input.Password className="cms-input" placeholder="请输入密码"
                                                    value={this.props.user.editUser.password}
                                                    onChange={this.handleValueChange.bind(this, 'password')}/>
                                </Form.Item>
                                <Form.Item label="确认密码" className="cms-form-item">
                                    <Input.Password className="cms-input" placeholder="请确认密码"
                                                    value={this.props.user.editUser.checkPassword}
                                                    onChange={this.handleValueChange.bind(this, 'checkPassword')}/>
                                </Form.Item>
                            </div> : null}
                    </Form>
                </div>
            </div>
        )

    }
}

export default Add;