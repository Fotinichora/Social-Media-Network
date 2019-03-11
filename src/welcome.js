


import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './register';
 //import Welcome from './welcome'
import Login from './login';
import App from './app';



//
export default class  Welcome extends React.Component{
        render() {
    return(
        <div id="welcome">
            <h1 className="h1test" >Analog Social Network</h1>
             <img className= "logo" src="/public/logo.png"  width= "200px"/>
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

//<img className="imgtest" src='https://png2.kisspng.com/sh/da6f9a0508529542a70b9c276f6b5da7/L0KzQYm3VMEzN6dtiZH0aYP2gLBuTgBpd6V0fARqcHjsc37tifxuNaFthAZ4Z4LkgLnCTfxwb5Cyftt1bYP3grr3TcVia5c6TNUBMHTocYq6TsQ5Omo1TaU9MUW1Q4a6V8A6PGE6T5D5bne=/kisspng-photographic-film-photography-logo-filmstrip-5acf54c60dea93.482905341523537094057.png' width= "200px" />
