import React, { Component } from 'react';

import { searchEngineCode, shortcutCode } from './data/shortcutData';

import './App.css';

import { shortcut } from './data/sc.min';

import SearchBar from './Components/SearchBar';
import SideBar from './Components/SideBar';

const secretKey = 'ctrl';

class App extends Component {
 constructor(props) {
  super(props);
  this.state = { toggleSide: false };
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
   console.log('hi');
   this.addShortcut(
    shortcutCode[i].split(' ')[0],
    shortcutCode[i].split(' ')[1]
   );
  }
  // this.shortcut.add(secretKey + '+1', function() {
  //  var t =
  //   $('input')
  //    .val()
  //    .toLowerCase() + '&btnI';
  //  actionSearch('', 'google.com/search?q=' + t, 'Google Lucky');
  // });
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
