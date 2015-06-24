import React from 'react';


class SongList extends React.Component {
  
   constructor() {
     super();
   }

    render() {
        let songNodes = [];
        if (this.props.data.length > 0) {
          songNodes = this.props.data.map((song, i) => { 
            let boundClick = this.props.onSelect.bind(this, i);
            let labelClick = this.props.onPlay.bind(this, i);
            return (
              <li key={i} ref={'song' + i}>
                <span onClick={boundClick}>{song.name}</span>
                <button type="button" className="btn btn-success btn-xs" onClick={labelClick}>Play</button>
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