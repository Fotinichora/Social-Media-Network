import React from 'react';

// //socket
import * as io from 'socket.io-client';

export default class OnlineNow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: []
    }
  }

  componentDidMount(){
    const socket = io.connect();
    socket.on('onlineUsers', (data) => {
        console.log("ONLINE USER UPDATE", data)
        this.setState({
          onlineUsers: data.onlineUsers
        })
    });
  }

  render() {
      return (
          <div>
              <h1 className="analogonlinetext"> Analogers Online </h1>
                {this.state.onlineUsers.map((f)=>{
                  return (
                    <div key={f.id}>
                      <div className="profilediv2">
                        <p> Name:{f.firstname}</p> <p>Last {f.lastname}</p> <img width={200} height={200} src={f.avatar} />
                      </div>
                    </div>
                  )
                })}
          </div>
      )
  }
}
//just a comment to update my mess
