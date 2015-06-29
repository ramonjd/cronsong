import React from 'react';
import Button from './Button.jsx';


class AudioPlayer extends React.Component {
  
   constructor() {
     super();
   }
  
    render() {
        let songPath = this.props.song.dir + this.props.song.name;
        this.songRef = this.props.song.name.replace(/\./g, '');  
        return (
              <div className="alert alert-info">
                <audio src={songPath} type="audio/mpeg" preload="auto" controls></audio>
              <div>
        );
    }
}
export default AudioPlayer;