import React from 'react';
import Request from 'superagent';
import Button from './Button.jsx';
import SongList from './SongList.jsx';
import CronSetter from './CronSetter.jsx';
import Actions from '../actions/Actions.jsx';
import SongStore from '../stores/SongStore.jsx';

let AUDIO_TYPES = {
    
    song : 'song',
    random : 'random',
    sound : 'sound'
  
};

let PLAYING = false;


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
    this.onChange = this.onChange.bind(this);
  }
  
  componentDidMount(){
    SongStore.addChangeListener(this.onChange);
  }
  
  componentWillUnmount() {
    this.setState(getState());
    SongStore.removeChangeListener(this.onChange);
  }
  
  onChange(songsArray) { 
     this.setState({
      data: songsArray,
      showCronSetter : this.state.selectedAudioType === 'random' ? true : false
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
    Actions[this.state.selectedAudioType].stop();
    let selectedSong = this.state.data[i].name;
    Actions[this.state.selectedAudioType].play(selectedSong);
  }

  stopSong() {
    if (this.state.selectedAudioType && this.state.selectedAudioType !== 'random') {
      Actions[this.state.selectedAudioType].stop();
    }
  }
  
  showSection(type) {
    this.setState({
      selectedAudioType : AUDIO_TYPES[type],
      showCronSetter : this.state.selectedAudioType === 'random' ? true : false
    });
    console.log('this.state', this.state);
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

    return (
        <section>
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
          {this.renderSongList()}
          {cronSetter} 
        </section>
    );
  }
}
export default SongManager;