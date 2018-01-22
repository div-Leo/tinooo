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
  this.checkLocalStorage();
 }

 componentDidMount() {
  this.inputFocus();
  this.socialBtn();
 }

 checkLocalStorage = () => {
  localStorage.getItem('userShortcuts')
   ? false
   : localStorage.setItem('userShortcuts', shortcutCode);
 };

 addShortcut = (a, b) => {
  shortcut.add(secretKey + '+' + a, function() {
   window.open('http://' + b, '');
  });
 };

 getShortcuts = () => localStorage.getItem('userShortcuts').split(',');

 socialBtn = () => {
  let shortcutData = this.getShortcuts();
  for (let i = 0; i < shortcutData.length; i++) {
   this.addShortcut(
    shortcutData[i].split(' ')[0],
    shortcutData[i].split(' ')[1]
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
    <SideBar
     shown={this.state.toggleSide}
     toggle={() => this.openHelp()}
     focusSearch={() => this.inputFocus()}
    />
    <SearchBar />
   </div>
  );
 }
}

export default App;
