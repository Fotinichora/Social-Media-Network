import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingReq: false,
      incominReq: false,
      friended: false
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }

  componentWillMount(){
    axios.get("/checkoutgoingfriend/"+this.props.userId).then(({ data }) => {
      if (data.exists) {
        this.setState({
          pendingReq: true,
          incominReq: false,
          friended: false
        });
      }
    });
    axios.get("/checkincomingfriend/"+this.props.userId).then(({ data }) => {
      if (data.exists) {
        this.setState({
          incominReq: true,
          pendingReq: false,
          friended: false
        });
      }
    });
    
    axios.get("/arewefriend/"+this.props.userId).then(({ data }) => {
      if (data.exists) {
        this.setState({
          friended: true,
          incominReq: false,
          pendingReq: false
        });
      }
    });
  }

  handleAdd() {
    axios.get("/addfriend/"+this.props.userId).then(({ data }) => {
      if (data.success) {
        this.setState({
          pendingReq: true,
          incominReq: false,
          friended: false
        });
      }
    });
  }

  handleCancel() {
    axios.get("/cancelfriend/"+this.props.userId).then(({ data }) => {
      if (data.success) {
        this.setState({
          pendingReq: false,
          incominReq: false,
          friended: false
        });
      }
    });
  }

  handleAccept() {
    axios.get("/acceptfriend/"+this.props.userId).then(({ data }) => {
      if (data.success) {
        this.setState({
          pendingReq: false,
          incominReq: false,
          friended: true
        });
      }
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className="friendrequest">
        { !this.state.pendingReq && !this.state.incominReq && !this.state.friended && <button className="friendrequest1" onClick={this.handleAdd}>
          Add Friend
        </button>}
        { this.state.pendingReq && <button className="friendrequest1" onClick={this.handleCancel}>
          Cancel Friend Request
        </button>}
        { this.state.friended && <button className="friendrequest1" onClick={this.handleCancel}>
          Unfriend
        </button>}
        { this.state.incominReq && !this.state.friended && <button className="friendrequest1" onClick={this.handleAccept}>
          Accept Friend Request
        </button>}
      </div>
    );
  }
}
