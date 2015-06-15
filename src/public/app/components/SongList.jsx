import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';


class SongList extends React.Component {
  
   constructor() {
     super();
     this.handleClick = this.handleClick.bind(this);
   }
  
    handleClick(i = 0) {
        this.refs['song' + i].getDOMNode().className = 'show';
    }
  
    render() {
        let songNodes = this.props.data.map((song, i) => { 
          let boundClick = this.props.onSelect.bind(this, i);
          return (
            <li onClick={boundClick} key={i} ref={'song' + i}>
              {song.name}
              <AudioPlayer/>
            </li>
          );
        });
      
        return (
            <ul>
              {songNodes}
            </ul>
        );
    }
}
export default SongList;