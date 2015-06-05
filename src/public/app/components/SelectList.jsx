import React from 'react';


class SelectList extends React.Component {
  
  constructor() {
    super();
  }

  render() {
    let listOptionNodes = this.props.data.map((item, i) => { 
      return (
        <option key={i} ref={'item' + i} value={item.value}>
          {item.name}
        </option>
      );
    });
        
    return (
        <select onChange={this.props.onChange} defaultValue={this.props.data[0].value}>
          {listOptionNodes}
        </select>
    );
  }
}
export default SelectList;