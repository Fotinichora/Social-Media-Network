import axios from 'axios';
//look for csrf for every request
//copy of axios include protection
var instance = axios.create({
    xsrfCookieName: 'mytoken',
    xsrfHeaderName: 'csrf-token'
});

export default instance;
