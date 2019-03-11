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
    //console.log(this);
      axios.post('/editbio', {
          biotext: this.state.bio,


      }).then(({data}) => {
          console.log("Yeah", data)
          if (data.success) {
            console.log("saved!!!");
            document.location.reload(true);//still ugly but i like
          } else {
              this.setState({
                  error: true
              });
          }
      })
  }



  render() {
    return (

        <div className="textbio">
          <label>
            <h3 className="textbiolabel">Please tell us about you! Write somethimg!!!!</h3>
            <textarea className="textareatest" value={this.state.value} onChange={this.handleChange} />
          </label>



        <button className="button1" onClick={this.submit}>SAVE</button>
        </div>



    )
  }
}
