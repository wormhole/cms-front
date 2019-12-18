import React, {Component} from 'react';
import {Breadcrumb, Table} from 'antd';
import {Link} from 'react-router-dom';

class UserManage extends Component {
    constructor(props) {
        super(props);
        console.log("UserManage");
    }

    render() {

        const columns = [
            {
                title: '用户名',
                dataIndex: 'uesrname',
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
                title: '状态',
                dataIndex: 'enabled',
                key: 'enabled',
            }
        ];

        return (
            <div className="cms-page">
                <Breadcrumb className="cms-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>用户与权限</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/user/user-manage" className="cms-link">用户管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-body">
                    <Table columns={columns}/>
                </div>
            </div>
        )
    }
}

export default UserManage;