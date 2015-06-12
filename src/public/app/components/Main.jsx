import React from 'react';
import Request from 'superagent';
import CronManager from './CronManager.jsx';
import SongManager from './SongManager.jsx';
import Button from './Button.jsx';

//https://facebook.github.io/react/tips/expose-component-functions.html
//http://facebook.github.io/react/docs/tutorial.html
// http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html

let randomCronComment = 'random-';
let songCronComment = '';

class Main extends React.Component {
  
constructor() {
  super();
  this.state = {
    showSongManager : true,
    showCronManager: false
  };
    this.renderSongManager = this.renderSongManager.bind(this);
    this.renderCronManager = this.renderCronManager.bind(this);
    this.showSongManager = this.showSongManager.bind(this);
    this.showCronManager = this.showCronManager.bind(this);

}


  
 renderSongManager(){
    if (this.state.showSongManager === true) {
        return <SongManager/>;
    }
 }
 
 renderCronManager(){
    if (this.state.showCronManager === true) {
        return <CronManager />;
    }
 }  
  
  
 showSongManager(){
    this.setState({
      showSongManager : true,
      showCronManager: false
    });
 }
 
 showCronManager(){
    this.setState({
      showSongManager : false,
      showCronManager: true
    });
 }   
  
  render() {
      return (
        <div>
          <Button onClick={this.showSongManager}>
            Song
          </Button>          
          <Button onClick={this.showCronManager}>
            Cron
          </Button>
          {this.renderSongManager()}
          {this.renderCronManager()}
        </div>
      );
  }
}
export default Main;