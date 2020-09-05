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
import router from "../../module/router";
import {Scrollbars} from "react-custom-scrollbars";
import "./home.less";
import "./module.less";
import getUrl from "../../util/url";
import exist from "../../util/menu";

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
                menus: []
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

        axios.put("/personal/user/password", this.props.home.edit).then(response => {
            if (response.data.status === true) {
                message.success(response.data.message);
                this.props.save({showModal: false, edit: {oldPassword: null, newPassword: null, checkPassword: null}});
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

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
                window.localStorage.removeItem("token");
                this.props.history.push("/login");
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

        });
    }

    handleValueChange(key, e) {
        this.props.save({edit: {...this.props.home.edit, [key]: e.target.value}});
    }

    loadData() {
        axios.get("/home/properties").then(response => {
            if (response.data.status) {
                let properties = response.data.data;
                properties.head = getUrl(properties.head);
                this.props.save({properties: properties});
            } else {
                message.error(response.data.message);
            }
        }).catch(error => {

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

        const hidden = {display: "none"};
        const menus = this.props.home.user.menus;

        return (
            <Layout className="cms-home">
                <Sider className="cms-home-left" trigger={null} collapsible collapsed={this.props.home.collapsed}>
                    <Scrollbars>
                        <div className="cms-home-logo">
                            <Avatar shape="square" size={40} src={this.props.home.properties.head}/>
                            <span className="cms-home-title"
                                  style={this.props.home.logoTextStyle}>{this.props.home.properties.title}</span>
                        </div>

                        <Menu theme="dark" mode="inline" className="cms-home-menu">
                            <Menu.Item key="dashboard" className="cms-home-item"
                                       style={exist("dashboard", menus) ? {} : hidden}>
                                <DashboardOutlined className="cms-home-icon"/>
                                <span><Link to="/dashboard"
                                            className="cms-home-link">仪表盘</Link></span>
                            </Menu.Item>
                            <SubMenu
                                className="cms-home-submenu"
                                key="auth"
                                title={
                                    <span className="cms-home-subtitle">
                                        <TeamOutlined className="cms-home-icon"/>
                                        <span>认证与授权</span>
                                    </span>
                                }
                                style={(exist("user", menus) || exist("role", menus)) ? {} : hidden}
                            >
                                <Menu.Item key="user" className="cms-home-item"
                                           style={exist("user", menus) ? {} : hidden}>
                                    <Link to="/auth/user" className="cms-home-link">用户管理</Link>
                                </Menu.Item>
                                <Menu.Item key="role" className="cms-home-item"
                                           style={exist("role", menus) ? {} : hidden}>
                                    <Link to="/auth/role" className="cms-home-link">角色管理</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                className="cms-home-submenu"
                                key="manage"
                                title={
                                    <span className="cms-home-subtitle">
                                        <SettingOutlined className="cms-home-icon"/>
                                        <span>网站管理</span>
                                    </span>
                                }
                                style={(exist("image", menus) || exist("base", menus)) ? {} : hidden}
                            >
                                <Menu.Item key="image" className="cms-home-item"
                                           style={exist("image", menus) ? {} : hidden}>
                                    <Link to="/manage/image" className="cms-home-link">图片管理</Link>
                                </Menu.Item>
                                <Menu.Item key="base" className="cms-home-item"
                                           style={exist("base", menus) ? {} : hidden}>
                                    <Link to="/manage/base" className="cms-home-link">基本信息</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Scrollbars>
                </Sider>
                <Layout className="cms-home-right">
                    <Header className="cms-home-head">
                        {this.props.home.collapsed ?
                            <MenuUnfoldOutlined className="cms-home-trigger"
                                                onClick={this.handleToggle.bind(this)}/> :
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
                    <Scrollbars>
                        <Content className="cms-home-body">
                            <Redirect path="/" to="/dashboard"/>
                            {
                                Object.keys(router).map((key) => {
                                    return (
                                        <Route exact key={key} path={key} component={router[key]}/>
                                    )
                                })
                            }
                            <Footer className="cms-home-footer">{this.props.home.properties.copyright}</Footer>
                        </Content>
                    </Scrollbars>
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