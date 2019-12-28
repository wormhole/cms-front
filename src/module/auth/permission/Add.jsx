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
            this.props.history.push("/auth/permission");
        }
    }

    componentWillUnmount() {
        this.props.save({
            editPermission: {
                id: null,
                name: null,
                description: null
            }
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleSave() {
        if (this.props.location.type === 'edit') {
            let param = {
                id: this.props.permission.editPermission.id,
                name: this.props.permission.editPermission.name,
                description: this.props.permission.editPermission.description
            };
            axios.put("/auth/permission/update", param).then(response => {
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
            axios.post('/auth/permission/add', {
                name: this.props.permission.editPermission.name,
                description: this.props.permission.editPermission.description
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
        this.props.save({editPermission: {...this.props.permission.editPermission, [key]: e.target.value}});
    }

    render() {
        return (

            <div className="cms-page">
                <Breadcrumb className="cms-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/permission" className="cms-link">权限管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/permission/add"
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
                        <div>
                            <Form.Item label="权限名" className="cms-form-item">
                                <Input type="text" className="cms-input" placeholder="请输入角色"
                                       value={this.props.permission.editPermission.name}
                                       onChange={this.handleValueChange.bind(this, 'name')}/>
                            </Form.Item>
                            <Form.Item label="描述" className="cms-form-item">
                                <Input type="description" className="cms-input" placeholder="请输入描述"
                                       value={this.props.permission.editPermission.description}
                                       onChange={this.handleValueChange.bind(this, 'description')}/>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        )

    }
}

export default Add;