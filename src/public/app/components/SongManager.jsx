import React from 'react';
import Request from 'superagent';
import Button from './Button.jsx';
import SongList from './SongList.jsx';
import CronSetter from './CronSetter.jsx';

class SongManager extends React.Component {
  
  constructor() {
    super();
     this.state = {
      data: [],
      showCronSetter : false,
      showSongList : false,
      random : true
    };
    this.showList = this.showList.bind(this);
    this.showRandom = this.showRandom.bind(this);
    this.selectSong = this.selectSong.bind(this);
    this.createCron = this.createCron.bind(this);
  }

  selectSong(i = 0) {
    let selectedSong = [this.state.data[i]];
    this.setState({
      data: selectedSong,
      showCronSetter : true,
      random : false
    });
  }

  showList() {
    Request
      .get('api/songs')
      .end((err, res) => {
        this.setState({
          showCronSetter : false,
          showSongList : true,
          data: JSON.parse(res.text)
        });
      });
  }

  showRandom() {
    Request
      .get('/api/songs/random')
      .end((err, res) => {
        this.setState({});
          this.setState({
            showCronSetter : true,
            showSongList : false,
            random : true,
            data: JSON.parse(res.text)[0]
          });
      });
  }
  
createCron(cron){
 let song = this.state.random ? 'random' : this.state.data[0].name;
    Request
    .post('/api/crons')
      .type('form')
      .send({'expression' : encodeURIComponent(cron.expression)})
      .send({'song' : encodeURIComponent(song)})
      .end((err, res) => {
        console.log(res);
    });
 } 
  
 renderCronSetter(){
    if ( this.state.showCronSetter === true) {
      return <CronSetter onCreateCronHandler={this.createCron} />;
    }
  }

  renderSongList(){
    if ( this.state.showSongList === true) {
      return <SongList data={this.state.data} onSelect={this.selectSong}/>;
    }
  }
  
  
  render() {
        
    return (
        <div className='songManager'>
          <h2>Play...</h2>
          <Button onClick={this.showList}>
            A song
          </Button>
          <Button onClick={this.showRandom}>
            A random song
          </Button>
          {this.renderSongList()}
          {this.renderCronSetter()} 
        </div>
    );
  }
}
export default SongManager;