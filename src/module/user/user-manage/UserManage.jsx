import React, {Component} from 'react';
import {Breadcrumb, Button, Table, Tag} from 'antd';
import {Link} from 'react-router-dom';

class UserManage extends Component {
    constructor(props) {
        super(props);
    }

    handleSelected(selectedRowKeys) {
        this.props.save({selectedRowKeys: selectedRowKeys});
    }

    handleTableChange(pagination, filters, sorter) {
        this.props.save({pagination});
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
    };

    render() {

        const columns = [
                {
                    title: '用户名',
                    dataIndex: 'username',
                    key: 'username',
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
                    dataIndex: 'role',
                    key: 'role',
                    render: (roles) => (
                        <span>
                              {roles.map(role => (
                                  <Tag color="blue" key={role}>
                                      {role}
                                  </Tag>
                              ))}
                        </span>
                    ),
                    filters: [
                        {
                            text: 'admin',
                            value: 'admin'
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
                    </div>
                    <Table
                        className="cms-table"
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.props.userManage.dataSource}
                        pagination={this.props.userManage.pagination}
                        onChange={this.handleTableChange.bind(this)}
                        bordered
                    />
                </div>
            </div>
        )
    }
}

export default UserManage;
