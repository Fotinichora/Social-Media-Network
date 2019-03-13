import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import ProfilePic from './profilepic';
import Uploader from './uploader';
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import FriendButton from "./friendbutton";


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploaderIsVisible: false,
            //using base64 to read from database (transfering image as text in database)
            avatarBase64: null,
            bio: ""

        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.editBio = this.editBio.bind(this);
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



    componentDidMount() {
        axios.get('/user').then(({data}) => {
          if(data.user){
            this.setState({
              avatarBase64: data.user.avatar != "avatar to change" ? data.user.avatar : "",
              bio:data.user.biotext,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
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
            <div className="body" >
               <img className="logo" src="/logo.png" />
               <h1 className="h1test" >Analog Social Network</h1>

                <ProfilePic
                    image={this.state.avatarBase64}
                    first={this.state.first}
                    last={this.state.last}
                    onClick={this.showUploader}
                />

                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}

                 <BrowserRouter>
                  <div>
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
                      <Route path="/user/:id" component={OtherProfile} />
                  </div>
                </BrowserRouter>
            </div>

      );

    }
}
