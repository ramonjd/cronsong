import React from 'react';
import Button from './Button.jsx';
import Store from '../stores/Store.jsx';
import uiConfig from '../utils/uiConfig.jsx';
import Actions from '../actions/Actions.jsx';



function getState() {
  return {
    header: Store.getHeader(),
    footer: Store.getFooter(),
    section: Store.getSection(),
    sectionId : Store.getSectionId()
  };
}


class Main extends React.Component {
  
  constructor() {
    super();
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);    
    this.onUIChange = this.onUIChange.bind(this);    
    this.toggleSection = this.toggleSection.bind(this);    
  }

  componentDidMount() {
      Store.addUIChangeListener(this.onUIChange);
      Actions.setUI('song');
      this.state = getState();
  }

  componentWillUnmount() {
      Store.removeUIChangeListener(this.onUIChange);
  }
  
  onUIChange() {
    this.setState(getState());
  } 
  
  toggleSection(sectionId){
    Actions.setUI(sectionId);
  }
  
  render() {
      let Header = this.state.header ? <this.state.header sectionId={this.state.sectionId} toggleSection={this.toggleSection}/> : null;
      let Footer = this.state.footer ? <this.state.footer sectionId={this.state.sectionId} /> : null;
      let Section = this.state.section ? <this.state.section/> : null;
      return (
        <main>
          {Header}
          {Section}
          {Footer}
        </main>
      );
  }
}
export default Main;