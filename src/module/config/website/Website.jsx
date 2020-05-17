import React, {Component} from "react";
import {Breadcrumb, Button, Form, Input, message, Upload} from "antd";
import {Link} from "react-router-dom";
import axios from "../../../util/axios";
import getBase64 from "../../../util/image";
import getUrl from "../../../util/url";

class Website extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    handleValueChange(key, e) {
        this.props.save({[key]: e.target.value});
    }

    handleBeforeUpload(file) {
        getBase64(file, imageUrl => {
            this.props.save({
                file: [file],
                head: imageUrl
            });
        });
        return false;
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleUpdate() {
        let param = [];
        param.push({"key": "title", "value": this.props.website.title});
        param.push({"key": "copyright", "value": this.props.website.copyright});

        axios.put("/config/website/update", param).then(response => {
            if (response.data.status) {
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

    handleUpdateHead() {
        let param = new FormData();
        param.append("file", this.props.website.file[0]);
        axios.post("/config/website/head", param, {headers: {"Content-Type": "multipart/form-data"}}).then(response => {
            if (response.data.status === true) {
                message.success(response.data.message);
                this.props.save({file: []});
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
        axios.put("/config/website/restore").then(response => {
            if (response.data.status) {
                message.success(response.data.message);
                let config = response.data.data;
                this.props.save({
                    title: config.title,
                    copyright: config.copyright,
                    head: getUrl(config.head)
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
        axios.get("/config/website/info").then(response => {
            if (response.data.status) {
                let config = response.data.data;
                this.props.save({
                    title: config.title,
                    copyright: config.copyright,
                    head: getUrl(config.head)
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
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/config/website"
                                           className="cms-module-link">网站设置</Link></Breadcrumb.Item>
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
                                           value={this.props.website.title}
                                           onChange={this.handleValueChange.bind(this, "title")}/>
                                </Form.Item>
                                <Form.Item label="版权" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入版权信息"
                                           value={this.props.website.copyright}
                                           onChange={this.handleValueChange.bind(this, "copyright")}/>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-item">
                                    <Button type="primary" onClick={this.handleUpdate.bind(this)}>更新设置</Button>
                                </Form.Item>
                                <Form.Item label="头像" className="cms-form-item">
                                    <Upload
                                        listType="picture-card"
                                        fileList={this.props.website.file}
                                        showUploadList={false}
                                        beforeUpload={this.handleBeforeUpload.bind(this)}>
                                        <img src={this.props.website.head} style={{width: "100%"}}/>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-item">
                                    <Button type="primary" onClick={this.handleUpdateHead.bind(this)}
                                            disabled={this.props.website.file.length > 0 ? false : true}>更新头像</Button>
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