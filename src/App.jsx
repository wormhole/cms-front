import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from './page/home/Home';
import Login from './page/login/Login';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <Route exact={true} path='/' component={Home}/>
                <Route exact={true} path='/login' component={Login}/>
            </HashRouter>
        );
    }
}

export default App;