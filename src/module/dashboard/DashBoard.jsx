import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cms-module">
                <Breadcrumb className="cms-module-breadcrumb">
                    <Breadcrumb.Item><Link to="/dashboard" className="cms-module-link">监控面板</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="cms-module-content">
                    dashboard
                </div>
            </div>
        );
    }
}

export default DashBoard;
