import React from 'react';
import Actions from '../actions/Actions.jsx';
import Store from '../stores/Store.jsx';


function getState() {
  return {
    playing : false
  };
}



class SongList extends React.Component {
  
   constructor() {
     super();
     this.state = getState();
     this.togglePlayer = this.togglePlayer.bind(this);    
         this.onAudioChange = this.onAudioChange.bind(this);

   }
  
  componentDidMount(){
    Store.addAudioChangeListener(this.onAudioChange);
  } 
  
  componentWillUnmount() {
    this.setState(getState());
    Store.removeAudioChangeListener(this.onAudioChange);
  }
  
  
  onAudioChange(data) { 
    if (data.action === 'close') {
        this.setState({
          playing :false,
          song : null
        });
    }
  }
  
  togglePlayer(i){
    
    let song = this.props.data[i];

   
      //let listNode =  React.findDOMNode(this.refs['song' + i]);
      // if playing and same elem is clicked
      // stop
      if (this.state.song === i && this.state.playing === true) {
          this.props.onStop();
          this.setState({
            playing :false,
            song : null
          });
        return;
      }
       // if playing and different elem is clicked
      // stop and play new elem
      if (this.state.playing === true) {
          this.props.onStop();
          this.setState({
            playing :false,
            song : null
          });
          setTimeout(function(){
          this.setState({
            playing :true,
            song : i
          });
          this.props.onPlay(i);
          }.bind(this), 500);
        return;
      }  

      // if stopped, play
      // stop and play new elem
      if (this.state.playing === false) {
          setTimeout(function(){
          this.setState({
            playing :true,
            song : i
          });
          this.props.onPlay(i);
          }.bind(this), 500);
        return;
      }
  }
  
    render() {
      
        let songNodes = [];

        if (this.props.data.length > 0) {
          songNodes = this.props.data.map((song, i) => { 
            let boundClick = this.props.onSelect.bind(this, i);
            let labelClick = this.togglePlayer.bind(this, i);
            let playLabel = this.state.song === i ? 'Stop' : 'Play';
            let playClass = this.state.song === i ? 'btn-warning' : 'btn-success';
            return (
              <li key={i} ref={'song' + i}>
                <span className="song-name" onClick={boundClick}>{song.name}</span>
                <span className={playClass} onClick={labelClick}>{playLabel}</span>
              </li>
            );
          });
        }
        return (
            <ul>
              {songNodes}
            </ul>
        );
    }
}
export default SongList;