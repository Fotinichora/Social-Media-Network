import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome';
// import Registration from './register';

let elem;

if (location.pathname == '/welcome'){
   elem = < Welcome / >
}
// else if  (location.pathname == '/register') {
//     elem = < Registration/>
// }
else {
  elem = <img src = "https://avatars2.githubusercontent.com/u/394668?s=400&v=4" / > ;
}

//
// if (location.pathname == '/register'){
//   elem = <Registration/>
// }
// else

ReactDOM.render(elem, document.querySelector('main'));
