import React from 'react';

import axios from "./axios";


export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.handleChange = this.handleChange.bind(this);
        this.uploader = this.uploader.bind(this);
    }
    handleChange(e) {
      this[e.target.file] = e.target.value;
    }

    uploader(e) {
      let reader = new FileReader();
      //read the file
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
          // console.log(reader.result);
          axios.post('/upload_avatar', {
              avatar: reader.result
          }).then(({data}) => {
              if (data.success) {
                // location.replace('/#/app');
                this.props.onUploaded ? this.props.onUploaded() : '';
                  // console.log("avatar changed");
                  // document.location.reload(true); // this is UGLY but works!!lol!
              } else {
                  this.setState({
                      error: true
                  });
              }
          })
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
    }

    render() {
      return (
          <div className="uploadtest">
            <label className="upladtest2">
              Change my avatar!
              <input name= "image" type="file" onChange={e => this.uploader(e)} />
            </label>
          </div>
      )
    }
}
