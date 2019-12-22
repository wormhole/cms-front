import React, {Component} from 'react';
import {Breadcrumb, Button, Input, message, Modal, Table, Tag, Tooltip, Transfer} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';

class UserManage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let params = {
            page: 1,
            limit: 10,
            ...this.props.userManage.params
        };
        this.loadTable(params);
        this.loadFilters();
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
            key: this.props.userManage.params.key
        };
        this.loadTable(params);
    };

    handleTableSearch(key) {
        let params = {
            page: 1,
            limit: 10,
            ...this.props.userManage.params,
            key: key
        };
        this.loadTable(params);
    }

    handleTableSearchValueChange(e) {
        this.props.save({keyValue: e.target.value});
    }

    handleDelete(ids) {
        if (ids.length === 0) {
            message.warning("请至少选择一条数据");
        } else {
            axios.delete("/api/user/user_manage/delete", {
                data: {
                    ids: ids
                }
            }).then(response => {
                if (response.data.status) {
                    message.success(response.data.message);
                    let selectedRowKeys = this.props.userManage.selectedRowKeys;
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
                        ...this.props.userManage.params
                    };
                    this.loadTable(params);
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

    handleEnabled(ids) {
        if (ids.length === 0) {
            message.warning("请至少选择一条数据");
        } else {
            axios.put("/api/user/user_manage/enabled", {
                ids: ids
            }).then(response => {
                if (response.data.status) {
                    message.success(response.data.message);
                    let params = {
                        page: this.props.userManage.pagination.current,
                        limit: this.props.userManage.pagination.pageSize,
                        ...this.props.userManage.params
                    };
                    this.loadTable(params);
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

    handleDisabled(ids) {
        if (ids.length === 0) {
            message.warning("请至少选择一条数据");
        } else {
            axios.put("/api/user/user_manage/disabled", {
                ids: ids
            }).then(response => {
                if (response.data.status) {
                    message.success(response.data.message);
                    let params = {
                        page: this.props.userManage.pagination.current,
                        limit: this.props.userManage.pagination.pageSize,
                        ...this.props.userManage.params
                    };
                    this.loadTable(params);
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

    handleGrantRole(id) {
        axios.get("/api/user/user_manage/ref_user_role", {
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

    handleTransferFilter(filterValue, option) {
        return option.name.indexOf(filterValue) > -1;
    }

    handleTransferChange(targetKeys, direction, moveKeys) {
        if (direction === 'left') {
            let targetKeys = this.props.userManage.transferTargetKeys;
            moveKeys.map((item) => {
                let index = targetKeys.indexOf(item);
                if (index > -1) {
                    targetKeys.splice(index, 1);
                }
            });
            this.props.save({transferTargetKeys: targetKeys});
        } else if (direction === 'right') {
            let targetKeys = this.props.userManage.transferTargetKeys;
            moveKeys.map((item) => {
                targetKeys.push(item);
            });
            this.props.save({transferTargetKeys: targetKeys});
        }
    }

    handleTransferOk() {
        axios.put("/api/user/user_manage/grant_role", {
            userId: this.props.userManage.userId,
            roleIds: this.props.userManage.transferTargetKeys
        }).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                let params = {
                    page: this.props.userManage.pagination.current,
                    limit: this.props.userManage.pagination.pageSize,
                    ...this.props.userManage.params
                };
                this.props.save({userId: null, transferModalShow: false});
                this.loadTable(params);
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

    handleTransferCancel() {
        this.props.save({
            transferModalShow: false
        })
    }

    loadTable(params) {
        this.props.save({
            loading: true,
            params: {sort: params.sort, order: params.order, key: params.key, roleIds: params.roleIds}
        });
        axios.get('/api/user/user_manage/list', {
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

    loadFilters() {
        axios.get('/api/user/user_manage/ref_role').then(response => {
            if (response.data.status) {
                let filters = [];
                response.data.data.roles.map((item) => {
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

    render() {

        const columns = [
                {
                    title: '用户名',
                    dataIndex: 'username',
                    key: 'username',
                    sorter: (a, b) => null
                },
                {
                    title: '电话',
                    dataIndex: 'telephone',
                    key: 'telephone',
                },
                {
                    title: '邮箱',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: '角色',
                    dataIndex: 'roles',
                    key: 'roles',
                    render: (roles) => (
                        <span>
                              {roles.map(role => (
                                  <Tag color="blue" key={role.id}>
                                      {role.name}
                                  </Tag>
                              ))}
                        </span>
                    ),
                    filters: this.props.userManage.filters
                },
                {
                    title: '状态',
                    dataIndex: 'enabled',
                    key: 'enabled',
                    sorter: true,
                    render: (enabled) => (
                        <span>{enabled === 1 ? '启用' : '禁用'}</span>
                    )
                },
            {
                title: '操作',
                key: 'deletable',
                dataIndex: 'deletable',
                fixed: 'right',
                width: 325,
                render: (deletable, recorder) => {
                    return (
                        <div>
                            <Tooltip placement="top" title={"编辑"}>
                                <Button type="primary" className="cms-inner-button" icon="edit" ghost/>
                            </Tooltip>
                            {deletable === 1 ?
                                <span>
                                    <Tooltip placement="top" title={"删除"}>
                                        <Button type="danger" className="cms-inner-button" icon="delete"
                                                onClick={this.handleDelete.bind(this, [recorder.id])} ghost/>
                                    </Tooltip>
                                    <Tooltip placement="top" title={"启用"}>
                                        <Button type="primary" className="cms-inner-button" icon="check"
                                                onClick={this.handleEnabled.bind(this, [recorder.id])} ghost/>
                                    </Tooltip>
                                    <Tooltip placement="top" title={"禁用"}>
                                        <Button type="danger" className="cms-inner-button" icon="close"
                                                onClick={this.handleDisabled.bind(this, [recorder.id])} ghost/>
                                    </Tooltip>
                                    <Tooltip placement="top" title={"分配角色"}>
                                        <Button type="primary" className="cms-inner-button" icon="user-add"
                                                onClick={this.handleGrantRole.bind(this, recorder.id)} ghost/>
                                    </Tooltip>
                                </span> : null
                            }
                        </div>
                    )
                }
            },
            ]
        ;

        return (
            <div className="cms-page">
                <Breadcrumb className="cms-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>用户与权限</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/user/user-manage" className="cms-link">用户管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-body">
                    <div className="cms-button-group">
                        <Button type="primary" className="cms-button">添加用户</Button>
                        <Button type="danger" className="cms-button"
                                disabled={this.props.userManage.selectedRowKeys.length > 0 ? false : true}
                                onClick={this.handleDelete.bind(this, this.props.userManage.selectedRowKeys)}>删除用户</Button>
                        <Button type="primary" className="cms-button"
                                disabled={this.props.userManage.selectedRowKeys.length > 0 ? false : true}
                                onClick={this.handleEnabled.bind(this, this.props.userManage.selectedRowKeys)}>启用</Button>
                        <Button type="danger" className="cms-button"
                                disabled={this.props.userManage.selectedRowKeys.length > 0 ? false : true}
                                onClick={this.handleDisabled.bind(this, this.props.userManage.selectedRowKeys)}>禁用</Button>
                        <Button type="primary" className="cms-button"
                                disabled={this.props.userManage.selectedRowKeys.length === 1 ? false : true}
                                onClick={this.handleGrantRole.bind(this, this.props.userManage.selectedRowKeys[0])}>分配角色</Button>
                        <Input.Search
                            placeholder="请输入关键字"
                            onSearch={this.handleTableSearch.bind(this)}
                            onChange={this.handleTableSearchValueChange.bind(this)}
                            value={this.props.userManage.keyValue}
                            className="cms-search"
                        />
                    </div>
                    <Table
                        className="cms-table"
                        rowSelection={{
                            selectedRowKeys: this.props.userManage.selectedRowKeys,
                            onChange: this.handleTableSelected.bind(this)
                        }}
                        columns={columns}
                        dataSource={this.props.userManage.dataSource}
                        pagination={this.props.userManage.pagination}
                        loading={this.props.userManage.loading}
                        onChange={this.handleTableChange.bind(this)}
                        scroll={{x: 1300}}
                        bordered
                    />
                </div>
                <Modal
                    title="分配角色"
                    visible={this.props.userManage.transferModalShow}
                    onOk={this.handleTransferOk.bind(this)}
                    onCancel={this.handleTransferCancel.bind(this)}
                    cancelText="取消"
                    okText="分配"
                    width="450px">
                    <Transfer
                        showSearch
                        titles={['未分配', '已分配']}
                        locale={{itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容'}}
                        dataSource={this.props.userManage.transferData}
                        filterOption={this.handleTransferFilter.bind(this)}
                        targetKeys={this.props.userManage.transferTargetKeys}
                        onChange={this.handleTransferChange.bind(this)}
                        render={item => item.name}
                    />
                </Modal>
            </div>
        )
    }
}

export default UserManage;
