import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

class UserManage extends Component {
    constructor(props) {
        super(props);
        console.log("UserManage");
    }

    render() {
        return (
            <div className="cms-page">
                <Breadcrumb className="cms-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>用户与权限</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/user/user-manage" className="cms-link">用户管理</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-body">
                    用户管理
                </div>
            </div>
        )
    }
}

export default UserManage;