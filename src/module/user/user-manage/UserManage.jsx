import React, {Component} from 'react';
import {Breadcrumb, Button, message, Table, Tag} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';

class UserManage extends Component {

    constructor(props) {
        super(props);
    }

    handleSelected(selectedRowKeys) {
        this.props.save({selectedRowKeys: selectedRowKeys});
    }

    handleTableChange(pagination, filters, sorter) {
        let params = {
            limit: pagination.pageSize,
            page: pagination.current,
            roleIds: filters.roles ? filters.roles : [],
            sort: sorter.field ? sorter.field : null,
            order: sorter.order ? sorter.order.substring(0, sorter.order.length - 3) : null
        };
        this.loading(params);
    };

    componentDidMount() {
        let params = {
            page: 1,
            limit: 10
        };
        this.loading(params);
    }

    loading(params) {
        this.props.save({loading: true});
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
            }
        }).catch(error => {
            message.error("服务器错误");
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
                    filters: [
                        {
                            text: 'admin',
                            value: 'ad66668e-bbc4-4209-91fe-0c581c9e4e93'
                        }, {
                            text: 'guest',
                            value: '44a2b276-a27f-4662-bb5e-70094a624391'
                        }
                    ]
                },
                {
                    title: '状态',
                    dataIndex: 'enabled',
                    key: 'enabled',
                    sorter: (a, b) => null,
                    render: (enabled) => (
                        <span>{enabled === 1 ? '启用' : '禁用'}</span>
                    )
                }
            ]
        ;

        const rowSelection = {
            selectedRowKeys: this.props.userManage.selectedRowKeys,
            onChange: this.handleSelected.bind(this)
        };

        return (
            <div className="cms-page">
                <Breadcrumb className="cms-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>用户与权限</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/user/user-manage" className="cms-link">用户管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-body">
                    <div className="cms-button-group">
                        <Button type="primary" className="cms-button">新增</Button>
                        <Button type="danger" className="cms-button">删除</Button>
                        <Button type="primary" className="cms-button" ghost>启用</Button>
                        <Button type="danger" className="cms-button" ghost>禁用</Button>
                    </div>
                    <Table
                        className="cms-table"
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.props.userManage.dataSource}
                        pagination={this.props.userManage.pagination}
                        loading={this.props.userManage.loading}
                        onChange={this.handleTableChange.bind(this)}
                        bordered
                    />
                </div>
            </div>
        )
    }
}

export default UserManage;
