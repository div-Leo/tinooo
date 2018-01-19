import React, { Component } from 'react';

import { searchEngineCode, shortcutCode } from '../data/shortcutData';

class SearchBar extends Component {
 // RENDER =========================

 render() {
  console.log(searchEngineCode, shortcutCode);
  return (
   <div>
    <input id="search-bar" placeholder="Something" type="Text" />
   </div>
  );
 }
}

export default SearchBar;
