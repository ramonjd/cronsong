import React from 'react';
import Button from './Button.jsx';
import SongList from './SongList.jsx';
import CronSetter from './CronSetter.jsx';
import Request from 'superagent';
//https://facebook.github.io/react/tips/expose-component-functions.html
//http://facebook.github.io/react/docs/tutorial.html
// http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html

let randomCronComment = 'random-';
let songCronComment = '';

class Main extends React.Component {
  
    constructor() {
      super();
      this.state = {
        data: [],
        className : '',
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
        className: 'select-song',
        showCronSetter : true,
        random : false
      });
    }
  
    showList() {
      this.setState({
        className: 'select-song-list',
        showCronSetter : false,
        showSongList : true
      });
      Request
        .get('api/songs')
        .end((err, res) => {
          this.setState({data: JSON.parse(res.text)});
        });
    }
  
    showRandom() {
      this.setState({
        className: 'select-song-random',
        showCronSetter : true,
        showSongList : false,
        random : true
      });
      Request
        .get('/api/songs/random')
        .end((err, res) => {
          this.setState({data: JSON.parse(res.text)[0]});
        });
    }
  
  
  
    createCron(cron){
     let song = this.state.random ? 'random' : this.state.data.name;
     console.log('Main has received: ', cron);
     console.log('Main cron on comment: ', song + '-' + Math.floor(new Date() / 1000));
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
            <div className={this.state.className}>
                <h1>Play...</h1>
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
export default Main;