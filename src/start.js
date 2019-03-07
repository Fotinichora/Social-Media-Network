import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome';
import App from './app';
// import Registration from './register';
// import Login from './login';

let elem;

if (location.pathname == '/'){
   elem = < Welcome/ >
}
//i dont need this
// else if  (location.pathname == '/register') {
//     elem = < Registration/>
// }
else {
  elem = <img src = "https://avatars2.githubusercontent.com/u/394668?s=400&v=4" / > ;
}



ReactDOM.render(elem, document.querySelector('main'));
