import React from 'react';
import Button from './Button.jsx';


class Header extends React.Component {
  
  constructor() {
    super();
    this.renderSongBar = this.renderSongBar.bind(this);  
    this.renderCronBar = this.renderCronBar.bind(this);  
  }
  
  renderSongBar() {
    let boundClick = this.props.toggleSection.bind(this, 'cron');
    return (
      <nav>
        <Button className="active">
          Song
        </Button>          
        <Button onClick={boundClick}>
          Cron
        </Button>
      </nav>
    );
  }  

  renderCronBar() {
    let boundClick = this.props.toggleSection.bind(this, 'song');
    return (
      <nav>
        <Button onClick={boundClick}>
          Song
        </Button>          
        <Button className="active">
          Cron
        </Button>
      </nav>
    );
  }
  
  render() {
     let navButtons = (this.props.sectionId === 'song' ? this.renderSongBar() : this.renderCronBar());
      return (
        <header>
            <h1>SongCron</h1>
              {navButtons}
            
        </header>
      );
  }
}
export default Header;