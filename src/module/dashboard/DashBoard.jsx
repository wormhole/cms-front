import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import './dashboard.less';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cms-page">
                <Breadcrumb className="cms-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-link">监控面板</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-body">
                    dashboard
                </div>
            </div>
        );
    }
}

export default DashBoard;