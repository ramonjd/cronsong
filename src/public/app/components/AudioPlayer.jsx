import React from 'react';
import Button from './Button.jsx';


class AudioPlayer extends React.Component {
  
   constructor() {
     super();
   }
  
  // toggleSoundPlayStop
  // togglePlayerVisibility
  
    render() {

        return (
            <div>
              <audio></audio>
            
            <Button>
              Play now
            </Button>
          </div>
        );
    }
}
export default AudioPlayer;