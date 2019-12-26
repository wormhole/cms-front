import React, {Component} from 'react';
import {Breadcrumb, Button, Input, message, Modal, Table, Tag, Transfer} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Role extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let params = {
            page: 1,
            limit: 10,
            ...this.props.role.params
        };
        this.loadTable(params);
    }

    handleTableSelected(selectedRowKeys) {
        this.props.save({selectedRowKeys: selectedRowKeys});
    }

    handleTableChange(pagination, filters, sorter) {
        let params = {
            limit: pagination.pageSize,
            page: pagination.current,
            permissionIds: filters.permissions ? filters.permissions : [],
            sort: sorter.field ? sorter.field : null,
            order: sorter.order ? sorter.order.substring(0, sorter.order.length - 3) : null,
            key: this.props.role.params.key
        };
        this.loadTable(params);
    };

    handleTableSearch(key) {
        let params = {
            page: 1,
            limit: 10,
            ...this.props.role.params,
            key: key
        };
        this.loadTable(params);
    }

    handleTableSearchValueChange(e) {
        this.props.save({keyValue: e.target.value});
    }

    handleAdd() {
        this.props.history.push({pathname: "/auth/role/add", type: "add"});
    }

    handleEdit(id) {
        this.props.user.dataSource.map((item) => {
            if (item.id === id) {
                this.props.save({editRole: {...item}});
            }
        });
        this.props.history.push({pathname: "/auth/role/add", type: "edit"});
    }

    handleDelete(ids) {
        axios.delete("/api/auth/role/delete", {
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
                    ...this.props.role.params
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

    handleGrantPermission(id) {
        axios.get("/api/auth/role/ref_role_permission", {
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
                    roleId: id
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
            let targetKeys = this.props.role.transferTargetKeys;
            moveKeys.map((item) => {
                let index = targetKeys.indexOf(item);
                if (index > -1) {
                    targetKeys.splice(index, 1);
                }
            });
            this.props.save({transferTargetKeys: targetKeys});
        } else if (direction === 'right') {
            let targetKeys = this.props.role.transferTargetKeys;
            moveKeys.map((item) => {
                targetKeys.push(item);
            });
            this.props.save({transferTargetKeys: targetKeys});
        }
    }

    handleTransferOk() {
        axios.put("/api/auth/role/grant_permission", {
            roleId: this.props.role.roleId,
            permissionIds: this.props.role.transferTargetKeys
        }).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                let params = {
                    page: this.props.role.pagination.current,
                    limit: this.props.role.pagination.pageSize,
                    ...this.props.role.params
                };
                this.props.save({roleId: null, transferModalShow: false});
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
            params: {sort: params.sort, order: params.order, key: params.key, permissionIds: params.permissionIds}
        });
        axios.get('/api/auth/role/list', {
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
                response.data.data.list.map((role) => {
                        dataSource.push({
                            ...role,
                            key: role.id
                        })
                    }
                );
                this.props.save({pagination: pagination, dataSource: dataSource, loading: false});
                this.loadFilters();
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
        axios.get('/api/auth/role/filters').then(response => {
            if (response.data.status) {
                let filters = [];
                response.data.data.permissions.map((item) => {
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
                    title: '角色名',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: (a, b) => null
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    key: 'description',
                },
                {
                    title: '权限',
                    dataIndex: 'permissions',
                    key: 'permissions',
                    render: (permissions) => (
                        <span>
                              {permissions.map(permission => (
                                  <Tag color="blue" key={permission.id}>
                                      {permission.name}
                                  </Tag>
                              ))}
                        </span>
                    ),
                    filters: this.props.role.filters
                },
                {
                    title: '操作项',
                    fixed: 'right',
                    width: 270,
                    render: (recorder) => {
                        return (
                            <div>
                                <a onClick={this.handleEdit.bind(this, recorder.id)}
                                   className="cms-inner-a">编辑</a>
                                {recorder.deletable === 1 ?
                                    <span>
                                        <a onClick={this.handleDelete.bind(this, [recorder.id])}
                                           className="cms-inner-danger-a">删除</a>
                                        <a onClick={this.handleGrantPermission.bind(this, recorder.id)}
                                           className="cms-inner-a">分配</a>
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
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/user" className="cms-link">角色管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-body">
                    <div className="cms-button-group">
                        <Button type="primary" className="cms-button" onClick={this.handleAdd.bind(this)}>添加</Button>
                        <Button type="danger" className="cms-button"
                                disabled={this.props.role.selectedRowKeys.length > 0 ? false : true}
                                onClick={this.handleDelete.bind(this, this.props.role.selectedRowKeys)}
                                ghost>删除</Button>
                        <Input.Search
                            placeholder="请输入关键字"
                            onSearch={this.handleTableSearch.bind(this)}
                            onChange={this.handleTableSearchValueChange.bind(this)}
                            value={this.props.role.keyValue}
                            className="cms-search"
                        />
                    </div>
                    <Table
                        className="cms-table"
                        rowSelection={{
                            selectedRowKeys: this.props.role.selectedRowKeys,
                            onChange: this.handleTableSelected.bind(this)
                        }}
                        columns={columns}
                        dataSource={this.props.role.dataSource}
                        pagination={this.props.role.pagination}
                        loading={this.props.role.loading}
                        onChange={this.handleTableChange.bind(this)}
                        scroll={{x: 1300}}
                        bordered
                    />
                </div>
                <Modal
                    title="分配权限"
                    visible={this.props.role.transferModalShow}
                    onOk={this.handleTransferOk.bind(this)}
                    onCancel={this.handleTransferCancel.bind(this)}
                    cancelText="取消"
                    okText="分配"
                    width="450px">
                    <Transfer
                        showSearch
                        titles={['未分配', '已分配']}
                        locale={{itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容'}}
                        dataSource={this.props.role.transferData}
                        filterOption={this.handleTransferFilter.bind(this)}
                        targetKeys={this.props.role.transferTargetKeys}
                        onChange={this.handleTransferChange.bind(this)}
                        render={item => item.name}
                    />
                </Modal>
            </div>
        )
    }
}

export default Role;
