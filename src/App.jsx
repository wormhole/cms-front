import React, {Component} from 'react';
import {HashRouter, Redirect, Route} from 'react-router-dom';
import Home from './module/home';
import Login from './module/login';
import Register from './module/register';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <Route path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Redirect from='/' to='/dashboard'/>
            </HashRouter>
        );
    }
}

export default App;