import React, {Component} from "react";
import {Breadcrumb, Button, Input, message, Table} from "antd";
import {Link} from "react-router-dom";
import axios from "../../../util/axios";

class Role extends Component {

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
            key: this.props.role.params.key
        };
        this.loadData(params);
    };

    handleTableSearch(key) {
        let params = {
            page: 1,
            limit: 10,
            ...this.props.role.params,
            key: key
        };
        this.loadData(params);
    }

    handleTableSearchValueChange(e) {
        this.props.save({keyValue: e.target.value});
    }

    handleAdd() {
        this.props.history.push({pathname: "/auth/role/add", type: "add"});
    }

    handleEdit(id) {
        this.props.history.push({pathname: "/auth/role/add", type: "edit", id: id});
    }

    handleDelete(ids) {
        axios.delete("/auth/role_manage/roles", {
            data: {
                ids: ids
            }
        }).then(result => {
            if (result.status) {
                message.success(result.message);
                let selectedRowKeys = this.props.role.selectedRowKeys;
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
                this.loadData(params);
            } else {
                message.error(result.message);
            }
        }).catch(error => {

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
                page: this.props.role.pagination.current,
                limit: this.props.role.pagination.pageSize,
                ...this.props.role.params
            }
        }
        axios.get("/auth/role_manage/roles", {
            params: {
                ...params
            }
        }).then(result => {
            if (result.status) {
                let pagination = {
                    current: params.page,
                    pageSize: params.limit,
                    total: result.data.total,
                };
                let dataSource = [];
                result.data.list.map((role) => {
                        dataSource.push({
                            ...role,
                            key: role.id
                        })
                    }
                );
                this.props.save({pagination: pagination, dataSource: dataSource, loading: false});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    render() {

        const columns = [{
                title: "角色名",
                dataIndex: "name",
                key: "name",
                sorter: true,
                ellipsis: true
            }, {
                title: "备注",
                dataIndex: "note",
                key: "note",
                ellipsis: true
            }, {
                title: "最后修改时间",
                dataIndex: "ts",
                key: "ts",
                ellipsis: true
            }, {
                title: "操作项",
                fixed: "right",
                width: 250,
                render: (recorder) => {
                    return (
                        <div>
                            <a onClick={this.handleEdit.bind(this, recorder.id)}
                               className="cms-module-normal">编辑</a>
                            {recorder.builtin === 0 ?
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
                    <Breadcrumb.Item><Link to="/auth/role"
                                           className="cms-module-link">角色管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-head">
                        <Button type="primary" className="cms-module-button"
                                onClick={this.handleAdd.bind(this)}>添加</Button>
                        <Button type="danger" className="cms-module-button"
                                disabled={this.props.role.selectedRowKeys.length > 0 ? false : true}
                                onClick={this.handleDelete.bind(this, this.props.role.selectedRowKeys)}
                                ghost>删除</Button>
                        <Input.Search
                            placeholder="请输入关键字"
                            onSearch={this.handleTableSearch.bind(this)}
                            onChange={this.handleTableSearchValueChange.bind(this)}
                            value={this.props.role.keyValue}
                            className="cms-module-search"
                        />
                    </div>
                    <div className="cms-module-body">
                        <Table
                            className="cms-module-table"
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
                </div>
            </div>
        )
    }
}

export default Role;