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

                <p> <a onClick={()=> {this.setState({editBio: true})}}>Want to edit ? Click here</a></p>


                {this.state.editBio && <BioEditor bio={this.props.bio}/>}
                <img src={this.props.image} />

            </div>
         )

       }
   }
