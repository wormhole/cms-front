import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from './module/home/Home';
import Login from './module/login';
import Register from './module/register';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <Route exact={true} path='/' component={Home}/>
                <Route exact={true} path='/login' component={Login}/>
                <Route exact={true} path='/register' component={Register}/>
            </HashRouter>
        );
    }
}

export default App;