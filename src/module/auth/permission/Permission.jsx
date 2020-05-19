import React, {Component} from "react";
import {Breadcrumb, Button, Input, message, Table} from "antd";
import {Link} from "react-router-dom";
import axios from "../../../util/axios";

class Permission extends Component {

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
            sort: sorter.field ? sorter.field : null,
            order: sorter.order ? sorter.order.substring(0, sorter.order.length - 3) : null,
            key: this.props.permission.params.key
        };
        this.loadData(params);
    };

    handleTableSearch(key) {
        let params = {
            page: 1,
            limit: 10,
            ...this.props.permission.params,
            key: key
        };
        this.loadData(params);
    }

    handleTableSearchValueChange(e) {
        this.props.save({keyValue: e.target.value});
    }

    handleAdd() {
        this.props.history.push({pathname: "/auth/permission/add", type: "add"});
    }

    handleEdit(id) {
        this.props.permission.dataSource.map((item) => {
            if (item.id === id) {
                this.props.save({edit: {...item}});
            }
        });
        this.props.history.push({pathname: "/auth/permission/add", type: "edit"});
    }

    handleDelete(ids) {
        axios.delete("/auth/permission/delete", {
            data: {
                ids: ids
            }
        }).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                let selectedRowKeys = this.props.permission.selectedRowKeys;
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
                    ...this.props.permission.params
                };
                this.loadData(params);
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
                    this.props.history.push("/error/403");
                    break;
                default:
                    message.error(error.response.data.message);
                    break;
            }
        });
    }

    loadData(params) {
        if (params) {
            this.props.save({
                loading: true,
                params: {sort: params.sort, order: params.order, key: params.key}
            });
        } else {
            params = {
                page: this.props.permission.pagination.current,
                limit: this.props.permission.pagination.pageSize,
                ...this.props.permission.params
            }
        }
        axios.get("/auth/permission/list", {
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
                response.data.data.list.map((permission) => {
                        dataSource.push({
                            ...permission,
                            key: permission.id
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
                    this.props.history.push("/error/403");
                    break;
                default:
                    message.error(error.response.data.message);
                    break;
            }
        });
    }

    render() {

        const columns = [{
                title: "权限名",
                dataIndex: "name",
                key: "name",
                sorter: true
            }, {
                title: "描述",
                dataIndex: "description",
                key: "description"
            }, {
                title: "操作项",
                fixed: "right",
                width: 250,
                render: (recorder) => {
                    return (
                        <div>
                            <a onClick={this.handleEdit.bind(this, recorder.id)}
                               className="cms-module-normal">编辑</a>
                            {recorder.deletable === 1 ?
                                <a onClick={this.handleDelete.bind(this, [recorder.id])}
                                   className="cms-module-danger">删除</a> : null
                            }
                        </div>
                    )
                }
            }]
        ;

        return (
            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>认证与授权</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/auth/permission"
                                           className="cms-module-link">权限管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-head">
                        <Button type="primary" className="cms-module-button"
                                onClick={this.handleAdd.bind(this)}>添加</Button>
                        <Button type="danger" className="cms-module-button"
                                disabled={this.props.permission.selectedRowKeys.length > 0 ? false : true}
                                onClick={this.handleDelete.bind(this, this.props.permission.selectedRowKeys)}
                                ghost>删除</Button>
                        <Input.Search
                            placeholder="请输入关键字"
                            onSearch={this.handleTableSearch.bind(this)}
                            onChange={this.handleTableSearchValueChange.bind(this)}
                            value={this.props.permission.keyValue}
                            className="cms-module-search"
                        />
                    </div>
                    <div className="cms-module-body">
                        <Table
                            className="cms-module-table"
                            rowSelection={{
                                selectedRowKeys: this.props.permission.selectedRowKeys,
                                onChange: this.handleTableSelected.bind(this)
                            }}
                            columns={columns}
                            dataSource={this.props.permission.dataSource}
                            pagination={this.props.permission.pagination}
                            loading={this.props.permission.loading}
                            onChange={this.handleTableChange.bind(this)}
                            scroll={{x: 1300}}
                            bordered
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Permission;