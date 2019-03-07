


import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './register';
 //import Welcome from './welcome'
import Login from './login';
//
export default class Welcome extends React.Component{
        render() {
    return(
        <div id="welcome">
            <h1>Welcome to my page!</h1>
            <img src="https://avatars2.githubusercontent.com/u/394668?s=400&v=4" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
}
