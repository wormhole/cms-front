import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Login from './page/login';
import Register from './page/register';
import Home from './page/home';
import './index.less';
import './module.less';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route path='/' component={Home}/>
            </Switch>
        </HashRouter>
    </Provider>, document.getElementById('app'));