import {Avatar, Dropdown, Icon, Layout, Menu, message} from 'antd';
import React, {Component} from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import axios from '../util/axios';
import './home.less';
import logo from '../image/logo.jpg';
import DashBoard from '../module/dashboard/DashBoard';
import Router from "../module/Router";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.save({
            user: {
                username: null,
                email: null,
                telephone: null,
                roles: [],
                permissions: []
            }
        });
    }

    componentDidMount() {
        axios.get('/home/menu').then(response => {
            if (response.data.status) {
                this.props.save({user: response.data.data});
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

    handleToggle() {
        this.props.save({
            collapsed: !this.props.home.collapsed,
            logoTextStyle: {display: this.props.home.collapsed ? 'inline' : 'none'}
        })
    };

    handleLogout() {
        axios.get('/logout').then(response => {
            if (response.data.status === true) {
                message.success(response.data.message);
                this.props.history.push("/login");
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {
            message.error(error.response.data.message);
        });
    }

    render() {

        const userDrop = (
            <Menu>
                <Menu.Item key="user-info">
                    <a href="#">个人信息</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">
                    <a href="#" onClick={this.handleLogout.bind(this)}>注销</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="cms-home">
                <Layout className="cms-layout">
                    <Sider className="cms-left" trigger={null} collapsible collapsed={this.props.home.collapsed}>
                        <div className="cms-logo">
                            <Avatar shape="square" size={40} src={logo} className="cms-avatar"/>
                            <span className="cms-logo-text" style={this.props.home.logoTextStyle}>内容管理系统</span>
                        </div>
                        <Menu theme="dark" mode="inline" className="cms-menu">
                            {this.props.home.user.permissions.indexOf('dashboard') > -1 ?
                                <Menu.Item key="dashboard" className="cms-menu-item">
                                    <Icon type="dashboard" size={40}/>
                                    <span><Link to="/dashboard"
                                                className="cms-link">监控面板</Link></span>
                                </Menu.Item> : null}
                            {this.props.home.user.permissions.indexOf('user') > -1 ?
                                <SubMenu
                                    className="cms-submenu"
                                    key="auth"
                                    title={
                                        <span className="cms-submenu-title">
                                        <Icon type="team" size={40}/>
                                        <span>认证与授权</span>
                                    </span>
                                    }
                                >
                                    <Menu.Item key="user" className="cms-menu-item"><Link to="/auth/user"
                                                                                          className="cms-link">用户管理</Link></Menu.Item>
                                    <Menu.Item key="role" className="cms-menu-item"><Link to="/auth/role"
                                                                                          className="cms-link">角色管理</Link></Menu.Item>
                                    <Menu.Item key="permission" className="cms-menu-item"><Link to="/auth/permission"
                                                                                                className="cms-link">权限管理</Link></Menu.Item>
                                </SubMenu> : null}
                        </Menu>
                    </Sider>
                    <Layout className="cms-right">
                        <Header className="cms-header">
                            <Icon
                                className="cms-trigger"
                                type={this.props.home.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.handleToggle.bind(this)}
                            />
                            <div className="cms-user">
                                <Dropdown overlay={userDrop} className="cms-dropdown" placement="bottomRight">
                                    <a className="ant-dropdown-link" href="#">
                                        {this.props.home.user.username ? this.props.home.user.username : '未登录'}&nbsp;
                                        <Icon type="down"/>
                                    </a>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content className="cms-content">
                            <Redirect path="/" to="/dashboard"/>
                            <Route exact path="/dashboard" component={DashBoard}/>
                            <Router/>
                            <Footer className="cms-footer">copyright &copy; 2019 by 凉衫薄</Footer>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Home;
