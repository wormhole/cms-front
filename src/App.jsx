import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './page/home/Home';
import Login from './page/login/Login';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
            </BrowserRouter>
        );
    }
}

export default App;