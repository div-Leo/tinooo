import React, { Component } from 'react';

import { shortcutCode } from './data/shortcutData';

import './App.css';

import { shortcut } from './data/sc.min';

import SearchBar from './Components/SearchBar';
import SideBar from './Components/SideBar';

const secretKey = 'ctrl';

class App extends Component {
 constructor(props) {
  super(props);
  this.state = { toggleSide: true };
 }

 componentDidMount() {
  this.inputFocus();
  this.socialBtn();
 }

 addShortcut = (a, b) => {
  shortcut.add(secretKey + '+' + a, function() {
   window.open('http://' + b, '');
  });
 };

 socialBtn = () => {
  for (let i = 0; i < shortcutCode.length; i++) {
   this.addShortcut(
    shortcutCode[i].split(' ')[0],
    shortcutCode[i].split(' ')[1]
   );
  }
 };

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
    // onClick={this.inputFocus}
    onKeyDown={e => this.grabEvent(e)}
   >
    <SideBar shown={this.state.toggleSide} />
    <SearchBar />
   </div>
  );
 }
}

export default App;
