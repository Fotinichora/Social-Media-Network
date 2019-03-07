import React from 'react';
import axios from './axios';

export default class Login extends React.Component {
    constructor(props) {
      console.log("?");
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    }
    submit() {
        axios.post('/login', {
            first: this.first,
            last: this.last,
            email: this.email,
            password: this.password
        }).then(({data}) => {
            if (data.success) {
                location.replace('/');
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
                First name
                 <br /><input name="first" onChange={e => this.handleChange(e)} />
                </label>

                 <br />
                <label>
                Last name
                 <br /><input name="last" />
                </label>

                 <br />
                <label>
                 email
                 <br /><input name="email" />
                </label>

                 <br />
                <label>
                password
                 <br /><input name="pass" />
                </label>

                 <br />
                 <br /><button>Login</button>
            </div>
        )
    }
}
