import {Avatar, Dropdown, Form, Input, Layout, Menu, message, Modal} from "antd";
import {
    CaretDownOutlined,
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    TeamOutlined
} from "@ant-design/icons";
import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import axios from "../../util/axios";
import logo from "../../image/logo.jpg";
import router from "../../module/router";
import "./home.less";
import "./module.less";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.handleClear();
    }

    handleClear() {
        this.props.save({
            user: {
                username: null,
                roles: [],
                permissions: []
            }
        });
    }

    componentDidMount() {
        axios.get("/home/authority").then(response => {
            if (response.data.status) {
                this.props.save({user: response.data.data});
                this.loadData();
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

    handleOpenPasswordModal() {
        this.props.save({showModal: true});
    }

    handleOk() {
        if (this.props.home.edit.newPassword !== this.props.home.edit.checkPassword) {
            message.error("两次密码不一致");
            return;
        }

        axios.put("/personal/password", this.props.home.edit).then(response => {
            if (response.data.status === true) {
                message.success(response.data.message);
                this.props.save({showModal: false, edit: {oldPassword: null, newPassword: null, checkPassword: null}});
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

    handleCancel() {
        this.props.save({showModal: false, edit: {oldPassword: null, newPassword: null, checkPassword: null}});
    }

    handleToggle() {
        this.props.save({
            collapsed: !this.props.home.collapsed,
            logoTextStyle: {display: this.props.home.collapsed ? "inline" : "none"}
        })
    };

    handleLogout() {
        axios.get("/logout").then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                this.props.history.push("/login");
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {
            message.error(error.response.data.message);
        });
    }

    handleValueChange(key, e) {
        this.props.save({edit: {...this.props.home.edit, [key]: e.target.value}});
    }

    loadData() {
        axios.get("/home/config").then(response => {
            if (response.data.status) {
                let configs = {};
                response.data.data.map(config => {
                    if (config.key === "title") {
                        configs["title"] = config.value;
                        document.title = config.value;
                    } else if (config.key === "copyright") {
                        configs["copyright"] = config.value;
                    } else if (config.key === "head") {
                        configs["head"] = config.value === "default" ? logo : process.env.NODE_ENV === "production" ? "" + config.value : "/api" + config.value
                    }
                });
                this.props.save({config: configs});
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

        const userDrop = (
            <Menu>
                <Menu.Item key="info">
                    <Link to="/personal">个人信息</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="password">
                    <a onClick={this.handleOpenPasswordModal.bind(this)}>修改密码</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">
                    <a href="#" onClick={this.handleLogout.bind(this)}>注销</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Layout className="cms-home">
                <Sider className="cms-home-left" trigger={null} collapsible collapsed={this.props.home.collapsed}>
                    <div className="cms-home-logo">
                        <Avatar shape="square" size={40} src={this.props.home.config.head}/>
                        <span className="cms-home-title"
                              style={this.props.home.logoTextStyle}>{this.props.home.config.title}</span>
                    </div>
                    <Menu theme="dark" mode="inline" className="cms-home-menu">
                        <Menu.Item key="dashboard" className="cms-home-item">
                            <DashboardOutlined className="cms-home-icon"/>
                            <span><Link to="/dashboard"
                                        className="cms-home-link">仪表盘</Link></span>
                        </Menu.Item>
                        {this.props.home.user.permissions.indexOf("user") > -1 ?
                            <SubMenu
                                className="cms-home-submenu"
                                key="auth"
                                title={
                                    <span className="cms-home-subtitle">
                                        <TeamOutlined className="cms-home-icon"/>
                                        <span>认证与授权</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="user" className="cms-home-item"><Link to="/auth/user"
                                                                                      className="cms-home-link">用户管理</Link></Menu.Item>
                                <Menu.Item key="role" className="cms-home-item"><Link to="/auth/role"
                                                                                      className="cms-home-link">角色管理</Link></Menu.Item>
                                <Menu.Item key="permission" className="cms-home-item"><Link to="/auth/permission"
                                                                                            className="cms-home-link">权限管理</Link></Menu.Item>
                            </SubMenu> : null}
                        {this.props.home.user.permissions.indexOf("config") > -1 ?
                            <Menu.Item key="config" className="cms-home-item">
                                <SettingOutlined className="cms-home-icon"/>
                                <span><Link to="/config"
                                            className="cms-home-link">系统设置</Link></span>
                            </Menu.Item> : null
                        }
                    </Menu>
                </Sider>
                <Layout className="cms-home-right">
                    <Header className="cms-home-head">
                        {this.props.home.collapsed ?
                            <MenuUnfoldOutlined className="cms-home-trigger" onClick={this.handleToggle.bind(this)}/> :
                            <MenuFoldOutlined className="cms-home-trigger" onClick={this.handleToggle.bind(this)}/>
                        }
                        <div className="cms-home-user">
                            <Dropdown overlay={userDrop} className="cms-home-dropdown" placement="bottomRight">
                                <a className="ant-dropdown-link">
                                    {this.props.home.user.username ? this.props.home.user.username : "未登录"}&nbsp;
                                    <CaretDownOutlined/>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content className="cms-home-body">
                        <Redirect path="/" to="/dashboard"/>
                        {
                            Object.keys(router).map((key) => {
                                return (
                                    <Route exact key={key} path={key} component={router[key]}/>
                                )
                            })
                        }
                        <Footer className="cms-home-footer">{this.props.home.config.copyright}</Footer>
                    </Content>
                </Layout>
                <Modal
                    title="修改密码"
                    visible={this.props.home.showModal}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    cancelText="取消"
                    okText="确定"
                    width="450px">
                    <div>
                        <Form.Item label="旧的密码" className="cms-module-item">
                            <Input.Password className="cms-module-input" placeholder="请输入旧密码"
                                            value={this.props.home.edit.oldPassword}
                                            onChange={this.handleValueChange.bind(this, "oldPassword")}/>
                        </Form.Item>
                        <Form.Item label="新的密码" className="cms-module-item">
                            <Input.Password className="cms-module-input" placeholder="请输入新密码"
                                            value={this.props.home.edit.newPassword}
                                            onChange={this.handleValueChange.bind(this, "newPassword")}/>
                        </Form.Item>
                        <Form.Item label="确认密码" className="cms-module-item">
                            <Input.Password className="cms-module-input" placeholder="请确认密码"
                                            value={this.props.home.edit.checkPassword}
                                            onChange={this.handleValueChange.bind(this, "checkPassword")}/>
                        </Form.Item>
                    </div>
                </Modal>
            </Layout>
        );
    }
}

export default Home;