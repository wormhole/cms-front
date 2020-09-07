import React, {Component} from "react";
import {Breadcrumb, Button, Form, Input, message, Upload} from "antd";
import {Link} from "react-router-dom";
import axios from "../../../util/axios";
import getBase64 from "../../../util/image";
import getUrl from "../../../util/url";
import api from "./api";

class Base extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    handleValueChange(key, e) {
        let value = e.target.value;
        this.props.save({[key]: value});
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
        param.push({"key": "title", "value": this.props.base.title});
        param.push({"key": "copyright", "value": this.props.base.copyright});

        axios.put(api.update, param).then(result => {
            if (result.status) {
                message.success(result.message);
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    handleUpdateHead() {
        let param = new FormData();
        param.append("file", this.props.base.file[0]);
        axios.post(api.head, param, {headers: {"Content-Type": "multipart/form-data"}}).then(result => {
            if (result.status === true) {
                message.success(result.message);
                this.props.save({file: []});
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    handleRestore() {
        axios.put(api.restore).then(result => {
            if (result.status) {
                message.success(result.message);
                let config = result.data;
                this.props.save({
                    title: config.title,
                    copyright: config.copyright,
                    head: getUrl(config.head)
                });
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    loadData() {
        axios.get(api.query).then(result => {
            if (result.status) {
                let config = result.data;
                this.props.save({
                    title: config.title,
                    copyright: config.copyright,
                    head: getUrl(config.head)
                });
            } else {
                message.error(result.message);
            }
        }).catch(error => {

        });
    }

    render() {
        return (
            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>网站管理</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/manage/base"
                                           className="cms-module-link">基本信息</Link></Breadcrumb.Item>
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
                                           value={this.props.base.title}
                                           onChange={this.handleValueChange.bind(this, "title")}/>
                                </Form.Item>
                                <Form.Item label="版权" className="cms-module-item">
                                    <Input type="text" className="cms-module-input" placeholder="请输入版权信息"
                                           value={this.props.base.copyright}
                                           onChange={this.handleValueChange.bind(this, "copyright")}/>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-item">
                                    <Button type="primary" onClick={this.handleUpdate.bind(this)}>更新设置</Button>
                                </Form.Item>
                                <Form.Item label="头像" className="cms-form-item">
                                    <Upload
                                        listType="picture-card"
                                        fileList={this.props.base.file}
                                        showUploadList={false}
                                        beforeUpload={this.handleBeforeUpload.bind(this)}>
                                        <img src={this.props.base.head} style={{width: "100%"}}/>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-item">
                                    <Button type="primary" onClick={this.handleUpdateHead.bind(this)}
                                            disabled={this.props.base.file.length > 0 ? false : true}>更新头像</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Base;