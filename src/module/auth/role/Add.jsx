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
            this.props.history.push("/auth/role");
        }
    }

    componentWillUnmount() {
        this.props.save({
            editRole: {
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
                id: this.props.role.editRole.id,
                name: this.props.role.editRole.name,
                description: this.props.role.editRole.description
            };
            axios.put("/auth/role/update", param).then(response => {
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
            axios.post('/auth/role/add', {
                name: this.props.role.editRole.name,
                description: this.props.role.editRole.description
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
        this.props.save({editRole: {...this.props.role.editRole, [key]: e.target.value}});
    }

    render() {
        return (

            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/role" className="cms-module-link">角色管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/role/add"
                                           className="cms-module-link">{this.props.location.type === 'edit' ? '编辑' : '添加'}</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-top">
                        <Button type="primary" className="cms-module-top-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                        <Button type="primary" className="cms-module-top-button"
                                onClick={this.handleSave.bind(this)}>保存</Button>
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
                    }} className="cms-module-form">
                        <div>
                            <Form.Item label="角色名" className="cms-module-form-item">
                                <Input type="text" className="cms-module-form-input" placeholder="请输入角色"
                                       value={this.props.role.editRole.name}
                                       onChange={this.handleValueChange.bind(this, 'name')}/>
                            </Form.Item>
                            <Form.Item label="描述" className="cms-module-form-item">
                                <Input type="description" className="cms-module-form-input" placeholder="请输入描述"
                                       value={this.props.role.editRole.description}
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