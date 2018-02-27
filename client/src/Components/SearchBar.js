import React, { Component } from 'react';
import { searchEngineCode, shortcutCode } from '../data/shortcutData';
import './SearchBar.css';
import serverHost from '../serverHost';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Tinooo .gt'
    };
  }
 actionSearch = (text, link, name) => {
   const fullTextSearch = text
     .split('&')
     .join('%26')
     .split(' ')
     .join('+');
   window.open('http://' + link + fullTextSearch, '');
   if (localStorage.getItem('accessToken')) {
     fetch(`${serverHost}/searches`, {
       method: 'POST',
       body: JSON.stringify({ search: text }),
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
       }
     });
     this.concatSearches(text);
   }
 };

 concatSearches = async str => {
   let localSearches = await localStorage.getItem('userSearches');
   let data = localSearches.split(',');
   data.push(str);
   let newData = data.join(',');
   await localStorage.setItem('userSearches', newData);
 };

 reset = () => {
   if (localStorage.getItem('accessToken')) {
     fetch(`${serverHost}/searches`, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
       }
     });
     fetch(`${serverHost}/shortcuts`, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
       }
     });
   }
 }

 searchWithBrain = x => {
   const input = x.target;
   if (input.value.trim() !== '') {
     let t = input.value.trim();

     if (t === 'reset tinooo'){
       this.reset();
       localStorage.setItem('userSearches', []);
       localStorage.setItem('userShortcuts', shortcutCode);
       input.value = '';
     }

     let searchText = t.trim().slice(t.trim().length - 4, t.trim().length);

     let translateText = t.trim().slice(t.trim().length - 6, t.trim().length);

     if (translateText.match(/\s[a-z][a-z]-[a-z][a-z]/)) {
       const item = translateText.trim().split('-');
       t = t.slice(0, t.trim().length - 6);
       this.actionSearch(t, `translate.google.com/#${item[0]}/${item[1]}/`, 'Translate');
       input.value = '';
     }

     searchEngineCode.forEach((el, i) => {
       const item = el.split(' ');
       if (searchText === ' ' + item[0]) {
         t = t.slice(0, t.trim().length - 4);
         this.actionSearch(t, item[1], item[2]);
         input.value = '';
       }
     });

     if (x.which === 13) {
       if (t.match(/http/) ) {
         this.actionSearch('',  t.slice(t.search(/\//)+2), 'Link');
       } else if (t.match(/www/)) {
         this.actionSearch('', t, 'Link');
       } else if (t.match(/\.com/)) {
         this.actionSearch('', t, 'Link');
       }
       else {
         this.actionSearch(t, 'google.it/?gws_rd=ssl#q=', 'Google');
       }
       input.value = '';
     }
   }
 };

 componentDidMount() {
   this.changePlaceholder();
 }

 changePlaceholder = () => {
   let placeholderArr = [
     'Hi! My name is Tinooo en-es',
     'Aliens riding cows .un',
     'Nikon d3200 .aa',
     'I\'m calling a function but she said she\'s busy .st',
     'How to program an app .gt',
     'Moonwalk tutorial .yy',
     'Array.prototype.map .md',
     'Springfield .mm',
     'Heisemberg .ww',
     'How to make pasta alla puttanesca .wh',
   ];
   setInterval(() => {
     let i = Math.floor(Math.random() * placeholderArr.length);
     this.setState({
       placeholder: placeholderArr[i]
     });
   }, 4000);
 };

 // RENDER =========================

 render() {
   return (
     <div>
       <input
         onKeyUp={e => this.searchWithBrain(e)}
         id="search-bar"
         className="searchbar"
         placeholder={this.state.placeholder}
         type="Text"
       />
     </div>
   );
 }
}

export default SearchBar;
