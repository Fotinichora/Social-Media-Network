import React from 'react';
import ProfilePic from './profilepic';
import Uploader from './uploader';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
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
        axios.get('/user', ({data}) => {
            this.setState(data);
        });
    }
    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <div>
                <img src="logo.gif" alt="My Social Network" />
                <ProfilePic
                    image={this.state.image}
                    first={this.state.first}
                    last={this.state.last}
                    onClick={this.showUploader}
                />
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
            </div>
        );
    }
}
