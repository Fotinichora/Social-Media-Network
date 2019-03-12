import React from 'react';
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editBio: false};
    }
    render() {
      //console.log(this.props);
        return (
            <div className="profilediv">
                <p>First name: {this.props.first}</p>
                <p>Last name: {this.props.last}</p>
                <p>Bio: {this.props.bio} </p>

                <BioEditor bio={this.props.bio} editBio={this.props.editBio}/>

                <img src={this.props.image} />

            </div>
         )

       }
   }
  //{this.state.editBio && <BioEditor bio={this.props.bio}/>}
