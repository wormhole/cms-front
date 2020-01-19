import React, {Component} from 'react';
import {Breadcrumb, Button, Form, Input, message, Upload} from 'antd';
import {Link} from 'react-router-dom';
import axios from "../../util/axios";
import logo from '../../image/logo.jpg';

class Config extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/config/info').then(response => {
            if (response.data.status) {
                response.data.data.map(config => {
                    if (config.key === 'title') {
                        this.props.save({title: {id: config.id, key: config.key, value: config.value}});
                    } else if (config.key === 'copyright') {
                        this.props.save({copyright: {id: config.id, key: config.key, value: config.value}});
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

    componentWillUnmount() {
        this.props.save({
            title: {
                id: null,
                key: null,
                value: null
            },
            copyright: {
                id: null,
                key: null,
                value: null
            }
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    handleUpdate() {

        let param = [];
        param.push(this.props.config.title);
        param.push(this.props.config.copyright);

        axios.put("/config/update", param).then(response => {
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

    handleValueChange(key, e) {
        if (key === 'title') {
            this.props.save({title: {...this.props.config.title, value: e.target.value}});
        } else if (key === 'copyright') {
            this.props.save({copyright: {...this.props.config.copyright, value: e.target.value}});
        }
    }

    handleBeforeUpload(file) {
        this.getBase64(file, imageUrl => {
            this.props.save({
                head: {
                    file: [file],
                    url: imageUrl
                }
            });
        });
        return false;
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
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
                    <div className="cms-module-tool">
                        <Button type="primary" className="cms-module-tool-back" onClick={this.handleBack.bind(this)}
                                ghost>返回</Button>
                    </div>
                    <div className="cms-module-main">
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
                                <Form.Item label="标题" className="cms-module-form-item">
                                    <Input type="text" className="cms-module-form-input" placeholder="请输入标题信息"
                                           value={this.props.config.title.value}
                                           onChange={this.handleValueChange.bind(this, 'title')}/>
                                </Form.Item>
                                <Form.Item label="版权" className="cms-module-form-item">
                                    <Input type="text" className="cms-module-form-input" placeholder="请输入版权信息"
                                           value={this.props.config.copyright.value}
                                           onChange={this.handleValueChange.bind(this, 'copyright')}/>
                                </Form.Item>
                                <Form.Item label="操作" className="cms-module-form-item">
                                    <Button type="primary" onClick={this.handleUpdate.bind(this)}>更新</Button>
                                </Form.Item>
                                <Form.Item label="文件上传" className="cms-form-item">
                                    <Upload
                                        listType="picture-card"
                                        fileList={this.props.config.head.file}
                                        showUploadList={false}
                                        beforeUpload={this.handleBeforeUpload.bind(this)}>
                                        {this.props.config.head.url ?
                                            <img src={this.props.config.head.url} style={{width: '100%'}}/> :
                                            <img src={logo} style={{width: '100%'}}/>}
                                    </Upload>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )

    }
}

export default Config;