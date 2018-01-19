import React, { Component } from 'react';

import './App.css';

import SearchBar from './Components/SearchBar';
import SideBar from './Components/SideBar';

class App extends Component {
 constructor(props) {
  super(props);
  this.state = { toggleSide: false };
 }

 componentDidMount() {
  this.inputFocus();
 }

 inputFocus = () => {
  const input = document.querySelector('#search-bar');
  input.focus();
 };

 openHelp = () => {
  //TODO: delete cookie ?
  //TODO: toggle sideBar - done
  this.setState({
   toggleSide: !this.state.toggleSide
  });
 };

 grabEvent = e => {
  console.log(e.which);
  switch (e.which) {
   case 18:
    this.openHelp();
   default:
    return;
  }
 };

 // RENDER =========================

 render() {
  return (
   <div
    className="App"
    onClick={this.inputFocus}
    onKeyDown={e => this.grabEvent(e)}
   >
    <SideBar shown={this.state.toggleSide} />
    <SearchBar />
   </div>
  );
 }
}

export default App;
