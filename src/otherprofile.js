import React from "react";

import axios from "./axios";

export default class OtherProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id
    }
  }

  componentDidMount() {
    axios.get("/user-api/"+this.state.userId).then(({ data }) => {
      if (data.user) {
        console.log(data.user);
        this.setState({
          avatarBase64:
            data.user.avatar != "avatar to change" ? data.user.avatar : "",
          // id: this.user.id,
          bio: data.user.biotext,
          firstname: data.user.firstname,
          lastname: data.user.lastname
        });
      }
    });
  }

  render() {
    //console.log(this.props);
    return (
      <div className="profilediv">
        <p>First name: {this.state.firstname}</p>
        <p>Last name: {this.state.lastname}</p>
        <p>Bio: {this.state.bio} </p>
        <img src={this.state.avatarBase64} />
      </div>
    );
  }
}
