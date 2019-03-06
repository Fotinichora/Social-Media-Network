


import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './register';
// import Welcome from './welcome'
//import Login from './login';
//<Route path="/login" component={Login} />
export default function Welcome() {

    return(
        <div id="welcome">
            <h1>Welcome to my page!</h1>
            <img src="https://avatars2.githubusercontent.com/u/394668?s=400&v=4" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />

                </div>
            </HashRouter>
        </div>
    );
}
