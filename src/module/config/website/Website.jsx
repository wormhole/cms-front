import React, {Component} from "react";
import {Breadcrumb, Button, Form, Input, message, Upload} from "antd";
import {Link} from "react-router-dom";
import axios from "../../../util/axios";
import logo from "../../../image/logo.jpg";
import getBase64 from "../../../util/image";

class Website extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    handleValueChange(key, e) {
        if (key === "title") {
            this.props.save({title: {...this.props.website.title, value: e.target.value}});
        } else if (key === "copyright") {
            this.props.save({copyright: {...this.props.website.copyright, value: e.target.value}});
        }
    }

    handleBeforeUpload(file) {
        getBase64(file, imageUrl => {
            this.props.save({
                head: {
                    file: [file],
                    url: imageUrl
                }
            });
        });
        return false;
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleUpdate() {
        let param = [];
        param.push(this.props.website.title);
        param.push(this.props.website.copyright);

        axios.put("/config/update", param).then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                this.props.save({
                    original: {
                        title: this.props.website.title.value,
                        copyright: this.props.website.copyright.value
                    }
                });
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

    handleUpdateHead() {
        let param = new FormData();
        param.append("file", this.props.website.head.file[0]);
        axios.post("/config/head", param, {headers: {"Content-Type": "multipart/form-data"}}).then(response => {
            if (response.data.status === true) {
                message.success(response.data.message);
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

    handleRestore() {
        axios.put("/config/restore").then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                response.data.data.map(config => {
                    if (config.key === "title") {
                        this.props.save({
                            title: {id: config.id, key: config.key, value: config.value},
                            original: {...this.props.website.original, title: config.value}
                        });
                    } else if (config.key === "copyright") {
                        this.props.save({
                            copyright: {id: config.id, key: config.key, value: config.value},
                            original: {...this.props.website.original, copyright: config.value}
                        });
                    } else if (config.key === "head") {
                        this.props.save({
                            head: {
                                file: [],
                                url: config.value === "default" ? null : process.env.NODE_ENV === "production" ? "" + config.value : "/api" + config.value
                            }
                        });
                    }
                });
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

    loadData() {
        axios.get("/config/info").then(response => {
            if (response.data.status) {
                response.data.data.map(config => {
                    if (config.key === "title") {
                        this.props.save({
                            title: {id: config.id, key: config.key, value: config.value},
                            original: {...this.props.website.original, title: config.value}
                        });
                    } else if (config.key === "copyright") {
                        this.props.save({
                            copyright: {id: config.id, key: config.key, value: config.value},
                            original: {...this.props.website.original, copyright: config.value}
                        });
                    } else if (config.key === "head") {
                        this.props.save({
                            head: {
                                file: [],
                                url: config.value === "default" ? null : process.env.NODE_ENV === "production" ? "" + config.value : "/api" + config.value
                            }
                        });
                    }
                });
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
        return (
            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/config"
                                           className="cms-module-link">系统设置</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-head">
                        <Button type="primary" className="cms-module-button"
                                onClick={this.handleRestore.bind(this)}>还原默认</Button>
                        <Button type="primary" className="cms-module-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                    </div>
                    <div className="cms-module-body">
                        <Form {...{
                            labelCol: {
                                xs: {span: 2},
                                sm: {span: 2}
                            },
                            wrapperCol: {
                                xs: {span: 8},
                                sm: {span: 8}
                            }
                        }} className="cms-module-form">
                            <div>
                                <Form.Item label="标题" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入标题信息"
                                           value={this.props.website.title.value}
                                           onChange={this.handleValueChange.bind(this, "title")}/>
                                </Form.Item>
                                <Form.Item label="版权" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入版权信息"
                                           value={this.props.website.copyright.value}
                                           onChange={this.handleValueChange.bind(this, "copyright")}/>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-item">
                                    <Button type="primary" onClick={this.handleUpdate.bind(this)}
                                            disabled={this.props.website.original.title === this.props.website.title.value && this.props.website.original.copyright === this.props.website.copyright.value}>更新设置</Button>
                                </Form.Item>
                                <Form.Item label="头像" className="cms-form-item">
                                    <Upload
                                        listType="picture-card"
                                        fileList={this.props.website.head.file}
                                        showUploadList={false}
                                        beforeUpload={this.handleBeforeUpload.bind(this)}>
                                        {this.props.website.head.url ?
                                            <img src={this.props.website.head.url} style={{width: "100%"}}/> :
                                            <img src={logo} style={{width: "100%"}}/>}
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-item">
                                    <Button type="primary" onClick={this.handleUpdateHead.bind(this)}
                                            disabled={this.props.website.head.file.length > 0 ? false : true}>更新头像</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Website;