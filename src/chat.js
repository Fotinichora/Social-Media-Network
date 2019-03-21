import React from 'react';

// //socket
import * as io from 'socket.io-client';

export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currMessage: ""
    }
    this.socket = io.connect();
  }

  componentDidMount(){
    this.socket.on('chatMessages', (data) => {
        this.setState({
          messages: data.messages.slice(1).slice(-10)
        })
    });
  }

  render() {
      return (
          <div>
              <h1 className="analogonlinetext"> Chat </h1>
              <div className="chatView">
              {this.state.messages.map((m)=>{
                return <p key={m.created}> <img src={m.avatar} width="25" height="25"/>   <b>{m.firstname}</b>: {m.message}</p>
              })}
              </div>
              <div className="messageView">
                <textarea className="textareatest2"onChange={(e)=>{
                  this.setState({
                    currMessage: e.target.value
                  })
                }} value={this.state.currMessage}></textarea>
                <button className="button2"onClick={(e)=>{
                  this.socket.emit('chatMessage', this.state.currMessage);
                  this.setState({
                    currMessage: ""
                  })
                }}>send</button>
              </div>
          </div>
      )
  }
}
//just a comment to update my mess
