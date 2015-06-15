import React from 'react';
import Button from './Button.jsx';

// https://www.npmjs.com/package/crontrans

class CronList extends React.Component {
  
   constructor() {
     super();
   }
  

    render() {
        let cronNodes = this.props.data.map((cron, i) => { 
          let boundClick = this.props.onDeleteCronHandler.bind(this, cron.comment);
          return (
            <li key={i} ref={'cron' + i}>
              {cron.comment}    
              <Button onClick={boundClick}>
                Delete
              </Button>
            </li>
          );
        });
      
        return (
            <ul>
              {cronNodes}
            </ul>
        );
    }
}
export default CronList;