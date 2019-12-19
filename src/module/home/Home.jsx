import {Avatar, Dropdown, Icon, Layout, Menu, message} from 'antd';
import React, {Component} from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import axios from 'axios';
import './home.less';
import logo from '../../image/logo.jpg';
import DashBoard from '../dashboard/DashBoard';
import UserManage from '../user/user-manage';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class Home extends Component {

    constructor(props) {
        super(props);
        console.log("Home");
    }

    toggle() {
        this.props.save({collapsed: !this.props.home.collapsed})
    };

    onLogout() {
        axios.get('/api/logout').then(res => {
            if (res.data.status === true) {
                message.success(res.data.message);
                this.props.history.push("/login");
            } else {
                message.error(res.data.message);
            }
        }).catch(error => {
            message.error("服务器错误");
        });
    }

    render() {

        const userDrop = (
            <Menu>
                <Menu.Item key="personal-info">
                    <a href="#">个人信息</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">
                    <a href="#" onClick={this.onLogout.bind(this)}>注销</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="cms-home">
                <Layout className="cms-layout">
                    <Sider className="cms-left" trigger={null} collapsible collapsed={this.props.home.collapsed}>
                        <div className="cms-logo">
                            <div>内容管理系统</div>
                        </div>
                        <Menu theme="dark" mode="inline" className="cms-menu">
                            <Menu.Item key="dashboard">
                                <Icon type="dashboard"/>
                                <span><Link to="/dashboard"
                                            className="cms-link">监控面板</Link></span>
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
                                <Menu.Item key="user-manage"><Link to="/user/user-manage"
                                                                   className="cms-link">用户管理</Link></Menu.Item>
                                <Menu.Item key="role-manage">角色管理</Menu.Item>
                                <Menu.Item key="permission-manage">权限管理</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="cms-right">
                        <Header className="cms-header">
                            <Icon
                                className="cms-trigger"
                                type={this.props.home.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle.bind(this)}
                            />
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
                            <Redirect path="/" to="/dashboard"/>
                            <Route exact path="/dashboard" component={DashBoard}/>
                            <Route exact path="/user/user-manage" component={UserManage}/>
                            <Footer className="cms-footer">copyright &copy; 2019 by 凉衫薄</Footer>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Home;
