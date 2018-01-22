import React, { Component } from 'react';
import { searchEngineCode } from '../data/shortcutData';
import './SearchBar.css'

class SearchBar extends Component {
 actionSearch = (text, link, name) => {
  console.log('text:', text, 'link:', link, 'name:', name);

  const fullTextSearch = text
   .split('&')
   .join('%26')
   .split(' ')
   .join('+');

  window.open('http://' + link + fullTextSearch, '');
 };

 searchWithBrain = x => {
  const input = x.target;
  if (input.value.trim() !== '') {
   let t = input.value.trim();

   if (t === 'reset tinooo') input.value = ''; // TODO: reset cache

   let searchText = t.trim().slice(t.trim().length - 4, t.trim().length);

   let translateText = t.trim().slice(t.trim().length - 6, t.trim().length);

   searchEngineCode.forEach((el, i) => {
    const item = el.split(' ');
    if (translateText === ' ' + item[0]) {
     t = t.slice(0, t.trim().length - 6);
     this.actionSearch(t, item[1], item[2]);
    }

    if (searchText === ' ' + item[0]) {
     t = t.slice(0, t.trim().length - 4);
     this.actionSearch(t, item[1], item[2]);
    }
   });

   if (x.which == 13)
    this.actionSearch(t, 'google.it/?gws_rd=ssl#q=', 'Google');
  }
 };

 // RENDER =========================

 render() {
  return (
   <div>
    <input
     onKeyUp={e => this.searchWithBrain(e)}
     id="search-bar"
     className="searchbar"
     placeholder="Something"
     type="Text"
    />
   </div>
  );
 }
}

export default SearchBar;
