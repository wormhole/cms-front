import React, {Component} from 'react';
import {Breadcrumb, Button, Form, Input} from 'antd';
import {Link} from 'react-router-dom';

class UserAdd extends Component {
    constructor(props) {
        super(props);
    }

    handleBack() {
        this.props.history.goBack();
    }

    render() {
        return (

            <div className="cms-page">
                <Breadcrumb className="cms-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>用户与权限</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/user/user-manage" className="cms-link">用户管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/user/user-manage/add"
                                           className="cms-link">{this.props.location.type === 'add' ? '添加' : '编辑'}</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-body">
                    <div className="cms-button-group">
                        <Button type="primary" className="cms-button-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                        <Button type="primary"
                                className="cms-button">保存</Button>
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
                                           value={this.props.userManage.editUser.username}/>
                                </Form.Item>
                                <Form.Item label="邮箱" className="cms-form-item">
                                    <Input type="email" className="cms-input" placeholder="请输入邮箱"
                                           value={this.props.userManage.editUser.email}/>
                                </Form.Item>
                                <Form.Item label="电话号码" className="cms-form-item">
                                    <Input type="telephone" className="cms-input" placeholder="请输入电话号码"
                                           value={this.props.userManage.editUser.telephone}/>
                                </Form.Item>
                            </div> : null}
                        {this.props.location.content !== 'base' ?
                            <div>
                                <Form.Item label="密码" className="cms-form-item">
                                    <Input.Password className="cms-input" placeholder="请输入密码"
                                                    value={this.props.userManage.editUser.password}/>
                                </Form.Item>
                                <Form.Item label="确认密码" className="cms-form-item">
                                    <Input.Password className="cms-input" placeholder="请确认密码"
                                                    value={this.props.userManage.editUser.checkPassword}/>
                                </Form.Item>
                            </div> : null}
                    </Form>
                </div>
            </div>
        )

    }
}

export default UserAdd;