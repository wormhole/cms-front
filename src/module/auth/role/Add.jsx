import React, {Component} from "react";
import {Breadcrumb, Button, Form, Input, message, Tree} from "antd";
import {Link} from "react-router-dom";
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

    componentDidMount() {
        this.loadMenuTree();
        if (this.props.location.type === "edit") {
            this.loadData(this.props.location.id);
        }
    }

    componentWillUnmount() {
        this.handleClear();
    }

    handleClear() {
        this.props.save({
            role: {
                id: null,
                name: null,
                note: null,
                menus: []
            },
            menus: [],
            expand: []
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleSave() {
        if (this.props.location.type === "edit") {
            axios.put("/role", this.props.role.role).then(result => {
                if (result.status) {
                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            }).catch(error => {

            });
        } else if (this.props.location.type === "add") {
            axios.post("/role", this.props.role.role).then(result => {
                if (result.status === true) {
                    message.success(result.message);
                    this.handleClear();
                    this.handleBack();
                } else {
                    message.error(result.message);
                }
            }).catch(error => {

            });
        }
    }

    handleChecked(keys) {
        this.props.save({role: {...this.props.role.role, menus: keys}});
    }

    handleValueChange(key, e) {
        this.props.save({role: {...this.props.role.role, [key]: e.target.value}});
    }

    loadData(id) {
        axios.get("/role/" + id).then(result => {
            if (result.status) {
                this.props.save({role: result.data});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    loadMenuTree() {
        axios.get("/menu/tree").then(result => {
            if (result.status) {
                let expand = [];
                result.data.map(menu => {
                    expand.push(menu.key);
                });
                this.props.save({menus: result.data, expand: expand});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    render() {

        return (

            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/role"
                                           className="cms-module-link">角色管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/role/add"
                                           className="cms-module-link">{this.props.location.type === "edit" ? "编辑" : "添加"}</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-head">
                        <Button type="primary" className="cms-module-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                        <Button type="primary" className="cms-module-button"
                                onClick={this.handleSave.bind(this)}>保存</Button>
                    </div>
                    <div className="cms-module-body">
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
                                <Form.Item label="角色名" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入角色"
                                           value={this.props.role.role.name}
                                           onChange={this.handleValueChange.bind(this, "name")}/>
                                </Form.Item>
                                <Form.Item label="备注" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入备注"
                                           value={this.props.role.role.note}
                                           onChange={this.handleValueChange.bind(this, "note")}/>
                                </Form.Item>
                            </div>
                        </Form>
                        <Tree
                            className="cms-module-tree"
                            checkable
                            expandedKeys={this.props.role.expand}
                            checkedKeys={this.props.role.role.menus}
                            onCheck={this.handleChecked.bind(this)}
                            treeData={this.props.role.menus}
                        />
                    </div>
                </div>
            </div>
        )

    }
}

export default Add;