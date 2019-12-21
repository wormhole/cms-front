import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
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
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;