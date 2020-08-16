import React, {Component} from "react";
import {Breadcrumb, Button, Input, message, Modal, Table, Tag, Transfer} from "antd";
import {Link} from "react-router-dom";
import axios from "../../../util/axios";

class User extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    handleTableSelected(selectedRowKeys) {
        this.props.save({selectedRowKeys: selectedRowKeys});
    }

    handleTableChange(pagination, filters, sorter) {
        let params = {
            limit: pagination.pageSize,
            page: pagination.current,
            roleIds: filters.roles ? filters.roles : [],
            sort: sorter.field ? sorter.field : null,
            order: sorter.order ? sorter.order.substring(0, sorter.order.length - 3) : null,
            key: this.props.user.params.key
        };
        this.loadData(params);
    };

    handleTableSearch(key) {
        let params = {
            page: 1,
            limit: 10,
            ...this.props.user.params,
            key: key
        };
        this.loadData(params);
    }

    handleTableSearchValueChange(e) {
        this.props.save({keyValue: e.target.value});
    }

    handleAdd() {
        this.props.history.push({pathname: "/auth/user/add", type: "add"});
    }

    handleEdit(id) {
        this.props.user.dataSource.map((item) => {
            if (item.id === id) {
                this.props.save({edit: {checkPassword: null, password: null, ...item}});
            }
        });
        this.props.history.push({pathname: "/auth/user/add", type: "edit", content: "base"});
    }

    handlePassword(id) {
        this.props.user.dataSource.map((item) => {
            if (item.id === id) {
                this.props.save({edit: {checkPassword: null, password: null, ...item}});
            }
        });
        this.props.history.push({pathname: "/auth/user/add", type: "edit", content: "password"});
    }

    handleDelete(ids) {
        axios.delete("/auth/user_manage/users", {
            data: {
                ids: ids
            }
        }).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                let selectedRowKeys = this.props.user.selectedRowKeys;
                ids.map((item) => {
                    let index = selectedRowKeys.indexOf(item);
                    if (index > -1) {
                        selectedRowKeys.splice(index, 1);
                    }
                });
                this.props.save({selectedRowKeys: selectedRowKeys});
                let params = {
                    page: 1,
                    limit: 10,
                    ...this.props.user.params
                };
                this.loadData(params);
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    handleEnabled(ids) {
        axios.put("/auth/user_manage/users/enabled", {
            ids: ids
        }).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                let params = {
                    page: this.props.user.pagination.current,
                    limit: this.props.user.pagination.pageSize,
                    ...this.props.user.params
                };
                this.loadData(params);
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    handleDisabled(ids) {
        axios.put("/auth/user_manage/users/disabled", {
            ids: ids
        }).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                let params = {
                    page: this.props.user.pagination.current,
                    limit: this.props.user.pagination.pageSize,
                    ...this.props.user.params
                };
                this.loadData(params);
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    handleGrantRole(id) {
        axios.get("/auth/user_manage/ref_user_role", {
            params: {
                id: id
            }
        }).then(response => {
            if (response.data.status) {
                let transferData = [];
                let transferTargetKeys = [];
                response.data.data.all.map((item) => {
                    transferData.push({
                        key: item.id,
                        name: item.name
                    });
                });
                response.data.data.target.map((item) => {
                    transferTargetKeys.push(item.id);
                });
                this.props.save({
                    transferData: transferData,
                    transferTargetKeys: transferTargetKeys,
                    transferModalShow: true,
                    userId: id
                });
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    handleTransferFilter(filterValue, option) {
        return option.name.indexOf(filterValue) > -1;
    }

    handleTransferChange(targetKeys, direction, moveKeys) {
        if (direction === "left") {
            let targetKeys = this.props.user.transferTargetKeys;
            moveKeys.map((item) => {
                let index = targetKeys.indexOf(item);
                if (index > -1) {
                    targetKeys.splice(index, 1);
                }
            });
            this.props.save({transferTargetKeys: targetKeys});
        } else if (direction === "right") {
            let targetKeys = this.props.user.transferTargetKeys;
            moveKeys.map((item) => {
                targetKeys.push(item);
            });
            this.props.save({transferTargetKeys: targetKeys});
        }
    }

    handleTransferOk() {
        axios.put("/auth/user_manage/grant_role", {
            userId: this.props.user.userId,
            roleIds: this.props.user.transferTargetKeys
        }).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                let params = {
                    page: this.props.user.pagination.current,
                    limit: this.props.user.pagination.pageSize,
                    ...this.props.user.params
                };
                this.props.save({userId: null, transferModalShow: false});
                this.loadData(params);
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    handleTransferCancel() {
        this.props.save({
            transferModalShow: false
        })
    }

    loadData(params) {
        if (params) {
            this.props.save({
                loading: true,
                params: {sort: params.sort, order: params.order, key: params.key, roleIds: params.roleIds}
            });
        } else {
            params = {
                page: this.props.user.pagination.current,
                limit: this.props.user.pagination.pageSize,
                ...this.props.user.params
            }
        }
        axios.get("/auth/user_manage/users", {
            params: {
                ...params
            }
        }).then(response => {
            if (response.data.status) {
                let pagination = {
                    current: params.page,
                    pageSize: params.limit,
                    total: response.data.data.total,
                };
                let dataSource = [];
                response.data.data.list.map((user) => {
                        dataSource.push({
                            ...user,
                            key: user.id
                        })
                    }
                );
                this.props.save({pagination: pagination, dataSource: dataSource, loading: false});
                this.loadRefRole();
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    loadRefRole() {
        axios.get("/auth/user_manage/ref_role").then(response => {
            if (response.data.status) {
                let filters = [];
                response.data.data.map((item) => {
                    filters.push({
                        text: item.name,
                        value: item.id
                    });
                });
                this.props.save({filters: filters});
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    render() {

        const columns = [{
            title: "用户名",
            dataIndex: "username",
            key: "username",
            sorter: true,
            ellipsis: true
        }, {
            title: "电话",
            dataIndex: "telephone",
            key: "telephone",
            ellipsis: true
        }, {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
            ellipsis: true
        }, {
            title: "会话时长",
            dataIndex: "ttl",
            key: "ttl",
            ellipsis: true
        }, {
            title: "登录限制",
            dataIndex: "limit",
            key: "limit"
        }, {
            title: "失败次数",
            dataIndex: "failure",
            key: "failure"
        }, {
            title: "锁定时间",
            dataIndex: "lock",
            key: "lock"
        }, {
            title: "角色",
            dataIndex: "roles",
            key: "roles",
            render: (roles) => (
                <span>
                    {roles.map(role => (
                        <Tag color="blue" key={role.id}>
                            {role.name}
                        </Tag>
                    ))}
                </span>
            ),
            filters: this.props.user.filters,
            ellipsis: true
        }, {
            title: "状态",
            dataIndex: "enable",
            key: "enable",
            sorter: true,
            render: (enable) => (
                <span>{enable === 1 ? <Tag color="green">启用</Tag> : <Tag color="red">禁用</Tag>}</span>
            )
        }, {
            title: "操作项",
            fixed: "right",
            width: 270,
            render: (recorder) => {
                return (
                    <div>
                        <a onClick={this.handleEdit.bind(this, recorder.id)}
                           className="cms-module-normal">编辑</a>
                        <a onClick={this.handleGrantRole.bind(this, recorder.id)}
                           className="cms-module-normal">分配</a>
                        <a onClick={this.handlePassword.bind(this, recorder.id)}
                           className="cms-module-danger">重置</a>
                        {recorder.builtin !== 1 ?
                            <span>
                                <a onClick={this.handleDelete.bind(this, [recorder.id])}
                                   className="cms-module-danger">删除</a>
                                {recorder.enable === 1 ?
                                    <a onClick={this.handleDisabled.bind(this, [recorder.id])}
                                       className="cms-module-danger">禁用</a> :
                                    <a onClick={this.handleEnabled.bind(this, [recorder.id])}
                                       className="cms-module-normal">启用</a>
                                }
                            </span> : null
                        }
                    </div>
                )
            }
        }];

        return (
            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/user"
                                           className="cms-module-link">用户管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-head">
                        <Button type="primary" className="cms-module-button"
                                onClick={this.handleAdd.bind(this)}>添加</Button>
                        <Button type="danger" className="cms-module-button"
                                disabled={this.props.user.selectedRowKeys.length > 0 ? false : true}
                                onClick={this.handleDelete.bind(this, this.props.user.selectedRowKeys)}
                                ghost>删除</Button>
                        <Input.Search
                            placeholder="请输入关键字"
                            onSearch={this.handleTableSearch.bind(this)}
                            onChange={this.handleTableSearchValueChange.bind(this)}
                            value={this.props.user.keyValue}
                            className="cms-module-search"
                        />
                    </div>
                    <div className="cms-module-body">
                        <Table
                            className="cms-module-table"
                            rowSelection={{
                                selectedRowKeys: this.props.user.selectedRowKeys,
                                onChange: this.handleTableSelected.bind(this)
                            }}
                            columns={columns}
                            dataSource={this.props.user.dataSource}
                            pagination={this.props.user.pagination}
                            loading={this.props.user.loading}
                            onChange={this.handleTableChange.bind(this)}
                            scroll={{x: 1300}}
                            bordered
                        />
                    </div>
                    <Modal
                        title="分配角色"
                        visible={this.props.user.transferModalShow}
                        onOk={this.handleTransferOk.bind(this)}
                        onCancel={this.handleTransferCancel.bind(this)}
                        cancelText="取消"
                        okText="分配"
                        width="450px">
                        <Transfer
                            showSearch
                            titles={["未分配", "已分配"]}
                            locale={{itemUnit: "项", itemsUnit: "项", searchPlaceholder: "请输入搜索内容"}}
                            dataSource={this.props.user.transferData}
                            filterOption={this.handleTransferFilter.bind(this)}
                            targetKeys={this.props.user.transferTargetKeys}
                            onChange={this.handleTransferChange.bind(this)}
                            render={item => item.name}
                        />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default User;