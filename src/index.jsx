import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './index.less';
import {Provider} from 'react-redux';
import store from './store';
import Login from "./login";
import Register from "./register";
import MainLayout from "./layout";

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route path='/' component={MainLayout}/>
            </Switch>
        </HashRouter>
    </Provider>, document.getElementById('app'));