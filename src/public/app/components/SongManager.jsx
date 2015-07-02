import React from 'react';
import Request from 'superagent';
import Button from './Button.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import SongList from './SongList.jsx';
import CronSetter from './CronSetter.jsx';
import Actions from '../actions/Actions.jsx';
import SongStore from '../stores/SongStore.jsx';
import Store from '../stores/Store.jsx';
import Constants from '../constants/Constants.jsx';

let AUDIO_TYPES = {
    song : 'song',
    random : 'random',
    sound : 'sound'
};

let PLAYING = false;
let SONGS_PATH = '/songs/';
let SOUNDS_PATH = '/sounds/';
let FULL_AUDIO_PATH = null;


function getState() {
  return {
    data : [],
    showCronSetter: false,
    selectedAudioType  : null
  };
}

class SongManager extends React.Component {
  
  constructor() {
    super();
    this.state = getState();
    this.showSection = this.showSection.bind(this);
    this.selectSong = this.selectSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.stopSong = this.stopSong.bind(this);
    this.createCron = this.createCron.bind(this);
    this.renderSongList = this.renderSongList.bind(this);
    this.renderAudioPlayer = this.renderAudioPlayer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAudioChange = this.onAudioChange.bind(this);
  }
  
  componentDidMount(){
    SongStore.addChangeListener(this.onChange);
    Store.addAudioChangeListener(this.onAudioChange);
  } 
  
  componentWillUnmount() {
    this.setState(getState());
    Store.removeAudioChangeListener(this.onAudioChange);
    SongStore.removeChangeListener(this.onChange);
  }
  
  onChange(songsArray) { 
     this.setState({
      data: songsArray,
      showCronSetter : this.state.selectedAudioType === 'random' ? true : false
    });
  }

  
  onAudioChange(data) { 
    console.log(data)
    let showAudioPlayer = data.action === 'play' ? true : false;
    if (showAudioPlayer === true) {
      FULL_AUDIO_PATH  = data.type === 'sound' ?  SOUNDS_PATH + data.audioFile :  SONGS_PATH + data.audioFile;
      console.log(FULL_AUDIO_PATH );
    }
    this.setState({
      'showAudioPlayer' : showAudioPlayer
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
    if (this.state.selectedAudioType && this.state.selectedAudioType !== 'random') {
      Actions.stop();
      Actions.play({
        audioFile : selectedSong,
        type : this.state.selectedAudioType
      });
    }
  }

  stopSong() {
    if (this.state.selectedAudioType && this.state.selectedAudioType !== 'random') {
      Actions.stop();
    }
  }
  
  closeAudio() {
    Actions.close();
    Actions.stop();
  }
  
  showSection(type) {
    this.setState({
      selectedAudioType : AUDIO_TYPES[type],
      showCronSetter : this.state.selectedAudioType === 'random' ? true : false
    });
    Actions[AUDIO_TYPES[type]].get();
  }


  // need to differentiate between song and sound
  createCron(cron){
    cron.song = this.state.selectedAudioType === 'random' ? this.state.selectedAudioType : this.state.data[0].name;
    cron.audioType = this.state.selectedAudioType;
    Actions.cron.create(cron);  
    Actions.ui.set('cron');
  } 
  
  renderCronSetter(){
    return (
      <CronSetter onCreateCronHandler={this.createCron} />
    );
  }

  
  renderAudioPlayer(){
    return (
      <AudioPlayer audioPath={FULL_AUDIO_PATH} onClose={this.closeAudio} />
    );
  }
  
  renderSongList(){
    return (
      <SongList data={this.state.data} onSelect={this.selectSong} onPlay={this.playSong} onStop={this.stopSong}/>
    );
  }
  
  render() {
    
    let showSongListClass = this.state.selectedAudioType === 'song' ? 'active' : '';
    let showSoundListClass = this.state.selectedAudioType === 'sound' ? 'active' : '';
    let showRandomClass = this.state.selectedAudioType === 'random' ? 'active' : '';
    let cronSetter = this.state.showCronSetter === true ? this.renderCronSetter() : null;
    let songList = this.state.data.length > 0 ? this.renderSongList() : null;
    let audioPlayer = this.state.showAudioPlayer === true ? this.renderAudioPlayer() : null;
    let audioPlayerClass = this.state.showAudioPlayer === true ? 'active' : '';

    return (
        <section className={audioPlayerClass}>
          <h2>Play...</h2>
          <Button className={showSongListClass} onClick={this.showSection.bind(this, 'song')}>
            A song
          </Button>
          <strong className="divider">or</strong>
          <Button className={showRandomClass} onClick={this.showSection.bind(this, 'random')}>
            A random song
          </Button>
          <strong className="divider">or</strong>
          <Button className={showSoundListClass} onClick={this.showSection.bind(this, 'sound')}>
            A Sound
          </Button>
          {songList}
          {cronSetter} 
          {audioPlayer} 
        </section>
    );
  }
}
export default SongManager;