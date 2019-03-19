import React from 'react';
import axios from './axios';
import { connect } from "react-redux";

export class Friends extends React.Component {

    getFriendsWannabes(data) {
      return {
        type: "UPDATE_WANNABE",
        payload: data.results
      }
    }

    getFriends(data) {
      return {
        type: "UPDATE_FRIENDS",
        payload: data.results
      }
    }

    componentDidMount() {
       axios.get("/checkallfriendreqs").then(({ data }) => {
         this.props.dispatch(this.getFriendsWannabes(data));
       });
       axios.get("/checkallfriends").then(({ data }) => {
         this.props.dispatch(this.getFriends(data));
       });
    }

    acceptHandler(id) {
      axios.get("/acceptfriend/"+id).then(({ data }) => {
        if (data.success) {
          axios.get("/checkallfriends").then(({ data }) => {
            this.props.dispatch(this.getFriends(data));
          });
          axios.get("/checkallfriendreqs").then(({ data }) => {
            this.props.dispatch(this.getFriendsWannabes(data));
          });
        }
      });
    }

    unfriendHandler(id) {
      axios.get("/cancelfriend/"+id).then(({ data }) => {
        if (data.success) {
          axios.get("/checkallfriends").then(({ data }) => {
            this.props.dispatch(this.getFriends(data));
          });
          axios.get("/checkallfriendreqs").then(({ data }) => {
            this.props.dispatch(this.getFriendsWannabes(data));
          });
        }
      });
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.acceptHandler = this.acceptHandler.bind(this);
    }

    render() {
      console.log(this.props);
        return (
            <div>
                <h1 className="FriendsWannabies">Friends Wannabies</h1>
                {this.props.friendsWannabies && this.props.friendsWannabies.map((f)=>{
                  return (
                    <div key={f.id}>
                      <div className="profilediv2">
                        <p> Name:{f.firstname}</p> <p>Last {f.lastname}</p> <img width={200} height={200} src={f.avatar} />
                          <button className="friendrequest1"onClick={()=>{this.acceptHandler(f.id)}}>accept</button>
                      </div>

                    </div>
                  )
                })}
                <h1 className="FriendsWannabies">Real Friends</h1>
                {this.props.friends && this.props.friends.map((f)=>{
                  return (
                    <div key={f.id}>
                      <div className="profilediv">
                        <p>Name: {f.firstname}</p> <p>Last:{f.lastname}</p>  <img width={200} height={200} src={f.avatar} />
                        <button className="friendrequest1"onClick={()=>{this.unfriendHandler(f.id)}}>unfriend</button>
                      </div>
                    </div>
                  )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        friendsWannabies: state.wannabies,
        friends: state.friends,
    }
};


export default connect(mapStateToProps)(Friends);


//i need to add delete friend button
