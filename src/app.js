import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import ProfilePic from './profilepic';
import Uploader from './uploader';
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import FriendButton from "./friendbutton";
import LogOut from "./logout";
import Login from "./login";
import Register from './register';
import Friends from './friends';
import OnlineNow from './onlinenow';

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            uploaderIsVisible: false,
            //using base64 to read from database (transfering image as text in database)
            avatarBase64: null,
            bio: ""

        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.editBio = this.editBio.bind(this);
        this.logout = this.logout.bind(this);
        this.uploadedHandler = this.uploadedHandler.bind(this);
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    setImage(image) {
        this.setState({image})
    }

    editBio(biotext) {
      console.log("biotext:", biotext);
       this.setState({ bio: biotext });
    }

    logout(){
      this.setState({
        logout: false
      })
    }

    uploadedHandler() {
      axios.get('/user').then(({data}) => {
        if(data.user){
          this.setState({
            avatarBase64: data.user.avatar != "avatar to change" ? data.user.avatar : "",
            bio:data.user.biotext,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            userId: data.user.id
          });
        }
      })
    }

    componentDidMount() {
        axios.get('/user').then(({data}) => {
          if(data.user){
            this.setState({
              avatarBase64: data.user.avatar != "avatar to change" ? data.user.avatar : "",
              bio:data.user.biotext,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              userId: data.user.id
            });
            //using base64 to read from database (transfering image as text in database

          }
        })
    }
    render() {
        // if (!this.state.id) {
        //     return null;
        // }
        return (
            <div  >
              <div className="firstdiv">
               <img className="logo" src="/logo.png"  />
               <h1 className="h1test" >Analog Social Network</h1>
                  {this.state.userId && <LogOut
                    onClick={this.logout}
                  />}

                  {this.state.userId && <button className="Friends" onClick={()=>{location.replace('/friends')}}>Friends</button>}
                  {this.state.userId && <button className="Friends1" onClick={()=>{location.replace('/online')}}>Online</button>}
                  {this.state.userId && <button className="Friends2" onClick={()=>{location.replace('/#/app')}}>Profile</button>}

                  {this.state.userId && <ProfilePic
                    image={this.state.avatarBase64}
                    first={this.state.first}
                    last={this.state.last}
                    onClick={this.showUploader}
                    />
                  }


                  {this.state.userId && this.state.uploaderIsVisible && <Uploader onUploaded={this.uploadedHandler} setImage={this.setImage} />}
               </div>
                 <BrowserRouter>
                  <div>
                    <div className= "userprofilecard">
                      <Route
                          exact
                          path="/"
                          render={() => (
                            <Profile
                                id={this.state.id}
                                first={this.state.firstname}
                                last={this.state.lastname}
                                image={this.state.avatarBase64}
                                bio={this.state.bio}

                                editBio={this.editBio}

                             />
                          )}
                      />
                      </div>
                      <Route path="/user/:id" component={OtherProfile} />
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                      <Route path="/friends" component={Friends} />
                      <Route path="/online" component={OnlineNow} />
                  </div>
                </BrowserRouter>
            </div>

      );

    }
}
//just a comment to update my mess
