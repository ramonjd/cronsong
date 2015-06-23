import React from 'react';


class SongList extends React.Component {
  
   constructor() {
     super();
     this.handleClick = this.handleClick.bind(this);
   }
  
    handleClick(i = 0) {
        this.refs['song' + i].getDOMNode().className = 'show';
    }
  
    render() {
        let songNodes = [];
        if (this.props.data.length > 0) {
          songNodes = this.props.data.map((song, i) => { 
            let boundClick = this.props.onSelect.bind(this, i);
            return (
              <li key={i} ref={'song' + i}>
                <span onClick={boundClick}>{song.name}</span>
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