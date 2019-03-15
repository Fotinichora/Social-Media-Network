import React from 'react';
import axios from './axios';

export default class Login extends React.Component {
    constructor(props) {
      console.log("?");
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    }
    submit() {
        axios.post('/login', {

            email: this.email,
            password: this.password
        }).then(({data}) => {
            if (data.success) {
              console.log("login success")
               location.replace('/#/app');
            } else {
                this.setState({
                    error: true
                });
            }
        })
    }
    render() {
        return (
            <div>
                {this.state.error && <div className="error">Oops!</div>}



                 <br />
                <label>
                 email
                 <br /><input name="email" onChange={e => this.handleChange(e)} />
                </label>

                 <br />
                <label>
                password
                 <br /><input type="password"name="password" onChange={e => this.handleChange(e)}/>
                </label>

                 <br />
                 <br /><button onClick={this.submit}>Login</button>
            </div>
        )
    }
}
