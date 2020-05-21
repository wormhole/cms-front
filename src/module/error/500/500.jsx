import React, {Component} from "react";
import {Breadcrumb, Button, Result} from "antd";
import {Link} from "react-router-dom";

class Page500 extends Component {

    handleBack() {
        this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>异常页</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/error/403"
                                           className="cms-module-link">403</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    <div className="cms-module-body">
                        <Result
                            status="500"
                            title="500"
                            subTitle="服务器出错啦"
                            extra={<Button type="primary" onClick={this.handleBack.bind(this)}>返回首页</Button>}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Page500;