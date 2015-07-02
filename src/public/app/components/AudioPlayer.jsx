import React from 'react';
import Button from './Button.jsx';


class AudioPlayer extends React.Component {
  
    constructor() {
      super();
     this.closeAudio = this.closeAudio.bind(this);  
    }
    componentDidMount(){
    }

    componentWillUnmount() {
    }

    closeAudio() {
      this.props.onClose({
        action : close
      });  
    }
    render() {
        return (
          <div className="overlay">
            <div className="modal fade in">
              <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Playing: <em>{this.props.audioPath}</em></h4>
                  </div>
                  <div className="modal-body">
                    <audio autoPlay src={this.props.audioPath} type="audio/mpeg" preload="auto" controls></audio>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default"  onClick={this.closeAudio}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
export default AudioPlayer;

