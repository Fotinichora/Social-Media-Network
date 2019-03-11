import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome';
import App from './app';

// import Registration from './register';
// import Login from './login';

let elem;

if (location.pathname == '/welcome'){
   elem = < Welcome/ >
}
else {
  elem = < App/ >
}
//i dont need this
// else if  (location.pathname == '/register') {
//     elem = < Registration/>
// }




ReactDOM.render(elem, document.querySelector('main'));
