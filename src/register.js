import React from 'react';
import axios from './axios';

export default class Registration extends React.Component {
    constructor(props) {
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
      console.log(this);
        axios.post('/register', {
            firstname: this.first,
            lastname: this.last,
            email: this.email,
            password: this.pass,
            avatar: "avatar to change"
        }).then(({data}) => {
            console.log("Yeah", data)
            if (data.success) {

                location.replace('/#/login');
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
                 <br /><input name="last" onChange={e => this.handleChange(e)}/>
                </label>

                 <br />
                <label>
                 email
                 <br /><input name="email" onChange={e => this.handleChange(e)}/>
                </label>

                 <br />
                <label>
                password
                 <br /><input name="pass" type="password" onChange={e => this.handleChange(e)}/>
                </label>

                 <br />
                 <br /><button onClick={this.submit}>Register</button>
            </div>
        )
    }
}
