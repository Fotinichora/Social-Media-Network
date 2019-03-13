import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingReq: false
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillMount(){
    axios.get("/checkfriend/"+this.props.userId).then(({ data }) => {
      if (data.exists) {
        this.setState({
          pendingReq: true,
        });
      }
    });
  }

  handleAdd() {
    axios.get("/addfriend/"+this.props.userId).then(({ data }) => {
      if (data.success) {
        this.setState({
          pendingReq: true,
        });
      }
    });
  }

  handleCancel() {
    axios.get("/cancelfriend/"+this.props.userId).then(({ data }) => {
      if (data.success) {
        this.setState({
          pendingReq: false,
        });
      }
    });
  }

  render() {
    return (
      <div className="friendrequest">
        { !this.state.pendingReq && <button className="friendrequest1" onClick={this.handleAdd}>
          Add Friend
        </button>}
        { this.state.pendingReq && <button className="friendrequest1" onClick={this.handleCancel}>
          Cancel Friend Request
        </button>}
      </div>
    );
  }
}
