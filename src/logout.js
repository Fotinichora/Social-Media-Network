import React from 'react';
import axios from './axios';

export default class LogOut extends React.Component {
    constructor(props) {
      console.log("?");
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.get('/logout', {


        }).then(({data}) => {
            if (data.success) {
              console.log("logout success")
               location.replace('/login');
            } else {
                this.setState({
                    error: true
                });
            }
        })
    }
    render() {
        return (





                 <button onClick={this.logout}>Logout</button>

        )
    }
}
