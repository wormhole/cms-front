import React, {Component} from "react";
import {Breadcrumb, Button, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
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
        this.handleClear();
    }

    handleClear() {
        this.props.save({
            edit: {
                id: null,
                name: null,
                note: null
            }
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleSave() {
        if (this.props.location.type === "edit") {
            let param = {
                id: this.props.permission.edit.id,
                name: this.props.permission.edit.name,
                note: this.props.permission.edit.note
            };
            axios.put("/auth/permission_manage/permission", param).then(response => {
                if (response.data.status) {
                    message.success(response.data.message);
                } else {
                    message.error(response.data.message);
                }
            }).catch(error => {

            });
        } else if (this.props.location.type === "add") {
            axios.post("/auth/permission_manage/permission", {
                name: this.props.permission.edit.name,
                note: this.props.permission.edit.note
            }).then(response => {
                if (response.data.status === true) {
                    message.success(response.data.message);
                    this.handleClear();
                } else {
                    message.error(response.data.message);
                }
            }).catch(error => {

            });
        }
    }

    handleValueChange(key, e) {
        this.props.save({edit: {...this.props.permission.edit, [key]: e.target.value}});
    }

    render() {
        return (

            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/permission"
                                           className="cms-module-link">权限管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/permission/add"
                                           className="cms-module-link">{this.props.location.type === "edit" ? "编辑" : "添加"}</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-head">
                        <Button type="primary" className="cms-module-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                        <Button type="primary" className="cms-module-button"
                                onClick={this.handleSave.bind(this)}>保存</Button>
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
                                <Form.Item label="权限名" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入权限名"
                                           value={this.props.permission.edit.name}
                                           onChange={this.handleValueChange.bind(this, "name")}/>
                                </Form.Item>
                                <Form.Item label="备注" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入备注"
                                           value={this.props.permission.edit.note}
                                           onChange={this.handleValueChange.bind(this, "note")}/>
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