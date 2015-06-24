import React from 'react';
import Request from 'superagent';
import Button from './Button.jsx';
import SongList from './SongList.jsx';
import CronSetter from './CronSetter.jsx';
import Actions from '../actions/Actions.jsx';
import SongStore from '../stores/SongStore.jsx';


class SongManager extends React.Component {
  
  constructor() {
    super();
    
    this.showList = this.showList.bind(this);
    this.showRandom = this.showRandom.bind(this);
    this.selectSong = this.selectSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.createSongCron = this.createSongCron.bind(this);
    this.onChange = this.onChange.bind(this);
    
    this.state = {
      showCronSetter : false,
      showSongList : false,
      random : false,
      data : []
    };
   
  }
  
  componentDidMount(){
     SongStore.addChangeListener(this.onChange);
  }
  
  componentWillUnmount() {
    SongStore.removeChangeListener(this.onChange);
  }
  
  onChange(songsArray) { 
     this.setState({
      data: songsArray
    });
  }
  
  selectSong(i = 0) {
    let selectedSong = [this.state.data[i]];
    this.setState({
      data: selectedSong,
      showCronSetter : true
    });
  }

  playSong(i = 0) {
    let selectedSong = this.state.data[i].name;
    console.log('SongManager', selectedSong);
    Actions.playSong(selectedSong);
  }
  
  showList() {
    Actions.getSongs();
    this.setState({
      showCronSetter : false,
      showSongList : true,
      random : false
     });
  }

  showRandom() {
    Actions.getSongs({random: true});
    this.setState({
      showCronSetter : true,
      showSongList : false,
      random : true
    });
  }

  createSongCron(cron){
    cron.song = this.state.random ? 'random' : this.state.data[0].name;
    Actions.createCron(cron);  
    Actions.setUI('cron');
  } 
  
  renderCronSetter(){
    if ( this.state.showCronSetter === true) {
      return <CronSetter onCreateCronHandler={this.createSongCron} />;
    }
  }

  renderSongList(){
    if ( this.state.showSongList === true) {
      return <SongList data={this.state.data} onSelect={this.selectSong} onPlay={this.playSong}/>;
    }
  }
  
  
  render() {
    let showListClass = this.state.showSongList === true ? 'active' : '';
    let showRandomClass = this.state.random === true ? 'active' : '';
    return (
        <div className='songManager'>
          <h2>Play...</h2>
          <Button className={showListClass} onClick={this.showList}>
            A song
          </Button>
          <Button className={showRandomClass} onClick={this.showRandom}>
            A random song
          </Button>
          {this.renderSongList()}
          {this.renderCronSetter()} 
        </div>
    );
  }
}
export default SongManager;