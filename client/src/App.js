import React, { Component } from 'react';

import { shortcutCode } from './data/shortcutData';

import './App.css';

import { shortcut } from './data/sc.min';

import SearchBar from './Components/SearchBar';
import SideBar from './Components/SideBar';

import animations from './animations';

const secretKey = 'ctrl';

class App extends Component {
 constructor(props) {
  super(props);
  this.state = {
   toggleSide: false,
   autofocus: true
  };
  this.checkLocalStorage();
 }

 componentDidMount() {
  this.inputFocus();
  this.socialBtn();
  const dot1 = document.querySelector('#dot_1');
  const dot2 = document.querySelector('#dot_2');
  const dot3 = document.querySelector('#dot_3');
  const dots = [dot2, dot3, dot1];
  animations.dotDrop(dots);
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
  if (this.state.autofocus) {
   const input = document.querySelector('#search-bar');
   input.focus();
  }
 };

 openHelp = () => {
  this.setState({
   toggleSide: !this.state.toggleSide
  });
 };

 textSearch = (x, input) => {
  console.log(input);
  if (localStorage.getItem('userSearches')) {
   let historySearch = localStorage.getItem('userSearches').split(',');
   let countHistory = historySearch.length;
   if (
    (countHistory < historySearch.length && countHistory > 0) ||
    (countHistory == 0 && x == 0) ||
    (countHistory == historySearch.length && x == 1)
   ) {
    if (x) {
     countHistory--;
     input.value = historySearch[countHistory];
    } else {
     countHistory++;
     input.value = historySearch[countHistory];
    }
   }
  }
 };

 grabEvent = e => {
  switch (e.which) {
   case 18:
    this.openHelp();
   case 38:
    this.textSearch(1, e.target); // up
   case 40:
    this.textSearch(0, e.target); // down
   default:
    return;
  }
 };

 changeFocusMode = automatic => {
  this.setState({
   autofocus: automatic
  });
 };

 // RENDER =========================

 render() {
  return (
   <div
    className="App"
    onClick={this.inputFocus}
    onKeyDown={e => this.grabEvent(e)}
   >
    <SideBar
     id="sidebar_container"
     changeFocus={this.changeFocusMode}
     shown={this.state.toggleSide}
     toggle={this.openHelp}
     focusSearch={this.inputFocus}
    />
    <div className="logo">
     <div className="logo_dot" id="dot_1" />
     <div className="logo_dot" id="dot_2" />
     <div className="logo_dot" id="dot_3" />
    </div>
    <SearchBar />
   </div>
  );
 }
}

export default App;
