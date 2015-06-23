import React from 'react';
import Button from './Button.jsx';

// https://www.npmjs.com/package/crontrans


class CronList extends React.Component {
  
   constructor() {
     super();
     
   }
  

    render() {
        
        if (this.props.data.length > 0) {
          
            let cronNodes = this.props.data.map((cron, i) => { 
              if (cron) {
                let boundClick = this.props.onDeleteCronHandler.bind(this, cron.comment);
                return (
                  <li key={i} ref={'cron' + i} title={cron.comment}>
                    <p><span className="label label-default">{cron.expression}</span></p>
                    <p><small><em>{cron.comment}</em></small></p>    
                    <Button onClick={boundClick}>
                      Delete
                    </Button>
                  </li>
                );
              }
           });
          if (cronNodes.length > 0) { 
            return (
                <ul className="cron-list">
                  {cronNodes}
                </ul>
            );
          } else {
            return (
              <p>No crons found</p>
            );   
          }

          
        } else {                           
            return (
              <p>No crons found</p>
            );                                              
        }
      

       

    }
}
export default CronList;