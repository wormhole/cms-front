import {Avatar, Breadcrumb, Dropdown, Icon, Layout, Menu} from 'antd';
import React, {Component} from 'react';
import './home.less';
import logo from '../../image/logo.jpg';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const userDrop = (
            <Menu>
                <Menu.Item key="0">
                    <a href="#">个人信息</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="1">
                    <a href="/logout">注销</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="cms-home">
                <Layout>
                    <Sider className="cms-left">
                        <div className="cms-logo">
                            <div>内容管理系统</div>
                        </div>
                        <Menu theme="dark" mode="inline" className="cms-menu">
                            <Menu.Item key="1">
                                <Icon type="dashboard"/>
                                <span>监控面板</span>
                            </Menu.Item>
                            <SubMenu
                                key="user"
                                title={
                                    <span>
                                        <Icon type="user"/>
                                        <span>用户与权限</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="2">用户管理</Menu.Item>
                                <Menu.Item key="3">角色管理</Menu.Item>
                                <Menu.Item key="4">权限管理</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="cms-right">
                        <Header className="cms-header">
                            <div className="cms-user">
                                <Dropdown overlay={userDrop} className="cms-dropdown">
                                    <a className="ant-dropdown-link" href="#">
                                        <Avatar size={40} src={logo} className="cms-avatar"/>
                                        admin<Icon type="down"/>
                                    </a>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content className="cms-content">
                            <Breadcrumb className="cms-content-breadcrumb">
                                <Breadcrumb.Item>监控面板</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="cms-content-body">
                                Content
                            </div>
                        </Content>
                        <Footer className="cms-footer">copyright &copy; 2019 by 凉衫薄</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Home;