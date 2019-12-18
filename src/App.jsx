import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from './module/home';
import Login from './module/login';
import Register from './module/register';

class App extends Component {

    constructor(props) {
        super(props);
        console.log("App");
    }

    render() {
        return (
            <HashRouter>
                <Route path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
            </HashRouter>
        );
    }
}

export default App;