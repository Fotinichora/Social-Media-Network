import React from 'react';
import axios from "./axios";
import ProfilePic from './profilepic';
import Uploader from './uploader';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploaderIsVisible: false,
            //using base64 to read from database (transfering image as text in database)
            avatarBase64: null
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    setImage(image) {
        this.setState({image})
    }
    componentDidMount() {
        axios.get('/user').then(({data}) => {
          if(data.user &&  data.user.avatar != "avatar to change"){
            this.setState({avatarBase64: data.user.avatar});
            //using base64 to read from database (transfering image as text in database)
          }
        })
    }
    render() {
        // if (!this.state.id) {
        //     return null;
        // }
        return (
            <div>

                <ProfilePic 
                    image={this.state.avatarBase64}
                    first={this.state.first}
                    last={this.state.last}
                    onClick={this.showUploader}
                />
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
            </div>
        );
    }
}
