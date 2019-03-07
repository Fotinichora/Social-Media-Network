


import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './register';
 //import Welcome from './welcome'
import Login from './login';
import App from './app';
//
export default class Welcome extends React.Component{
        render() {
    return(
        <div id="welcome">
            <h1 >Analog Social Network</h1>
            <img src="https://avatars2.githubusercontent.com/u/394668?s=400&v=4" width= "200px" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/app" component={App} />
                </div>
            </HashRouter>
        </div>
    );
}
}
