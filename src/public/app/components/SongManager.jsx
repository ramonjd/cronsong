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

let SELECTED_AUDIO_TYPE = AUDIO_TYPES.song;

class SongManager extends React.Component {
  
  constructor() {
    super();
    this.state = {
      data : []
    };
    
    this.showSection = this.showSection.bind(this);
    this.selectSong = this.selectSong.bind(this);
    this.playSong = this.playSong.bind(this);
    this.createSongCron = this.createSongCron.bind(this);
    this.renderSongList = this.renderSongList.bind(this);
    this.onChange = this.onChange.bind(this);

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
    Actions[SELECTED_AUDIO_TYPE].play(selectedSong);
  }

  
  showSection(type) {
    console.log(type);
    SELECTED_AUDIO_TYPE = AUDIO_TYPES[type];
    Actions[SELECTED_AUDIO_TYPE].get();
  }


  // need to differentiate between song and sound
  createSongCron(cron){
    cron.song = SELECTED_AUDIO_TYPE ? 'random' : this.state.data[0].name;
    Actions.cron.create(cron);  
    Actions.ui.setUI('cron');
  } 
  
  renderCronSetter(){
    return (
      <CronSetter onCreateCronHandler={this.createSongCron} />
    );
  }

  renderSongList(){
    return (
        <SongList data={this.state.data} onSelect={this.selectSong} onPlay={this.playSong}/>
      );
  }
  
  render() {
    
    let showSongListClass = SELECTED_AUDIO_TYPE === 'song' ? 'active' : '';
    let showSoundListClass = SELECTED_AUDIO_TYPE === 'sound' ? 'active' : '';
    let showRandomClass = SELECTED_AUDIO_TYPE === 'random' ? 'active' : '';

    return (
        <div className='songManager'>
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
          {this.renderCronSetter()} 
        </div>
    );
  }
}
export default SongManager;