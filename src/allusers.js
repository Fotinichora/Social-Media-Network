import React from 'react';
import { Link } from 'react-router-dom'

import axios from "./axios";


export default class AllUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allUsers: []
    }
  }

  componentDidMount(){
    axios.get("/user-api-all").then(({ data }) => {
      if (data.users) {
        const all_users = data.users.map((u)=>{
          return {
            avatar: u.avatar != "avatar to change" ? u.avatar : "",
            id: u.id,
            bio: u.biotext,
            firstname: u.firstname,
            lastname: u.lastname
          };
        });
        this.setState({
          allUsers: all_users,
        });
      }
    });
  }

  render() {
      return (
          <div>
              <h1 className="h2test"> Analogers </h1>
                {this.state.allUsers.map((f)=>{
                  return (
                    <div key={f.id}>
                      <div className="profilediv">
                      <Link className="profilelink" to={"/user/"+f.id}>Profile</Link>
                        <p> Name:{f.firstname}</p> <p>Last {f.lastname}</p> <p>{f.bio}</p> <img width={200} height={200} src={f.avatar}   />


                      </div>
                    </div>
                  )
                })}
          </div>
      )
  }
}
//just a comment to update my mess
