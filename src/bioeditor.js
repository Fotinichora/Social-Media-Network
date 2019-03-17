import React from 'react';

import axios from "./axios";



export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bio:""};

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
      this.setState({bio:e.target.value});
      console.log(this.state);
    }

  //i need here the axios.

  submit(bioText) {
     console.log(this);
      axios.post('/editbio', {
          biotext: this.state.bio,
      }).then((data) => {
          console.log("Yeah", data)
          if (data.data.success) {
            console.log("saved!!!");

            //hide the textarea
            this.setState({editBio: false});

            //document.location.reload(true);//still ugly but i like


          this.props.editBio(data.data.results.rows[0].biotext);


          } else {
              this.setState({
                  error: true
              });
          }
      })
  }



  render() {
    console.log("this.bio:", this.props);
      //{this.state.editBio && <BioEditor bio={this.props.bio}/>}
    return (

        <div >

            <h3 className="textbiolabel">Please tell us about you! Write somethimg!!!!</h3>

            {this.state.editBio && (<div className="secdiv">

           <textarea className="textareatest" value={this.state.value} onChange={this.handleChange} bio={this.props.bio}/>
           <button className="button1" onClick={this.submit}>SAVE</button></div>)}



        <p> <a onClick={()=> {this.setState({editBio: true})}}>Want to edit ? Click here</a></p>

        </div>



    )
  }
}
