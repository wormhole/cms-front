import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
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
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route path='/' component={Home}/>
            </HashRouter>
        );
    }
}

export default App;