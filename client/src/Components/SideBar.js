import React, { Component } from 'react';
import Profile from './Profile';
import './SideBar.css';

import { searchEngineCode, shortcutCode } from '../data/shortcutData';
import animations from '../animations';
import ModalAdd from './ModalAdd';

class SideBar extends Component {
 constructor(props) {
  super(props);
  this.state = {
   shortcuts: false,
   codes: false,
   more: false,
   about: false,
   showModal: false
  };
 }

 componentDidMount() {
  // let element = document.querySelector('.side_container');
  // animations.sideBarOpen(element);
 }

 getShortcuts = () => localStorage.getItem('userShortcuts').split(',');

 heightOfLi = (id, list) => {
  return id === 'shortcuts' && this.state.loggedIn
   ? list.length * 46 + 79 + 46
   : list.length * 46 + 79;
 };

 openLi = async (e, id, list) => {
  let num;
  console.log('LIST======', list);
  list ? (num = this.heightOfLi(id, list)) : (num = 280);
  const target = document.querySelector(`#${id}`);
  if (this.state[id]) {
   animations.dropUp(target);
   animations.turnArrow(e.target, 0);
  } else {
   animations.dropDown(target, num);
   animations.turnArrow(e.target, 90);
  }
  await this.setState({
   [id]: !this.state[id]
  });
 };

 show() {
  this.props.changeFocus(false);
  console.log('show');
  this.setState({ showModal: true });
 }

 close() {
  this.props.changeFocus(true);
  console.log('close');
  this.setState({ showModal: false });
 }

 loggedIn(bool) {
  this.setState({ loggedIn: bool });
 }

 setUserData(data) {
  this.setState({ userData: data });
 }

 logout() {
  this.setState({ userData: undefined, loggedIn: false });
  this.props.toggle();
  this.props.focusSearch();
 }

 anim() {
  let element = document.querySelector('.side_container');
  console.log(element);
  // animations.sideBarOpen(element);
 }

 // RENDER =========

 render() {
  return this.props.shown ? (
   <div className="side_container">
    <div idk={this.anim()} className="side_button_x">
     <div className="side_line" id="line_1" />
     <div className="side_line" id="line_2" />
    </div>
    <Profile
     logged={bool => this.loggedIn(bool)}
     setUserData={data => this.setUserData(data)}
     userData={this.state.userData}
     logout={bool => this.logout(bool)}
    />
    <h1 className="side_title">Tinooo's Settings</h1>
    <p className="side_text">
     Tinooo is a multiple search engine developed for a smarter and faster
     research with shortcut and filtration. There are no buttons on the screen
     because you do not need them. A wonderful and smart project made for
     developers.
    </p>
    <div id="shortcuts" className="side_li">
     <div className="side_li_main">
      <h1 className="side_li_title">Shortcuts:</h1>
      <div
       className="side_li_arrow"
       onClick={e => this.openLi(e, 'shortcuts', this.getShortcuts())}
      />
     </div>
     <div>
      <p className="side_li_text">
       Using one of the following key combinations, you will be directed
       immediately to the website indicated.
      </p>
      {this.getShortcuts().map((item, i) => {
       return (
        <div key={i} className="side_li_item">
         <h3>{item.split(' ')[2]}</h3>
         <h3>Ctrl + {item.split(' ')[0]}</h3>
        </div>
       );
      })}
      {this.state.loggedIn ? (
       <div className="side_li_item" onClick={() => this.show()}>
        <h3 className="side_li_add">Add new</h3>
        <h3 className="side_li_add">+</h3>
       </div>
      ) : null}
     </div>
    </div>

    <div id="codes" className="side_li">
     <div className="side_li_main">
      <h1 className="side_li_title">Codes for search:</h1>
      <div
       className="side_li_arrow"
       onClick={e => this.openLi(e, 'codes', searchEngineCode)}
      />
     </div>
     <div>
      <p className="side_li_text">
       Attaching one of the codes at the end of your search will immediately
       open a new window with the given search.
      </p>
      {searchEngineCode.map((item, i) => {
       return (
        <div key={i} className="side_li_item">
         <h3>{item.split(' ')[2]}</h3>
         <h3>{item.split(' ')[0]}</h3>
        </div>
       );
      })}
     </div>
    </div>

    <div id="more" className="side_li">
     <div className="side_li_main">
      <h1 className="side_li_title">More options:</h1>
      <div className="side_li_arrow" onClick={e => this.openLi(e, 'more')} />
     </div>
     <div>
      <div className="side_li_about_item">
       <h2>Incognito</h2>
       <p>Incognito will allow you to search history-free with confidence.</p>
      </div>
      <div className="side_li_about_item">
       <h2>Reset</h2>
       <p>
        Type in the search bar 'reset tinooo' to clear your history entirely.
       </p>
      </div>
     </div>
    </div>

    <div id="about" className="side_li">
     <div className="side_li_main">
      <h1 className="side_li_title">About:</h1>
      <div className="side_li_arrow" onClick={e => this.openLi(e, 'about')} />
     </div>
     <div>
      <div className="side_li_about_item">
       <h2>Contact us</h2>
       <p>
        For any suggestions, feedback or criticism, please contact us at:{' '}
        <span>leodivittorio@gmail.com</span> or{' '}
        <span>rainierlouis@gmail.com</span>
       </p>
      </div>
      <div className="side_li_about_item">
       <h2>Open source</h2>
       <p>
        Feel free to check out our repository on{' '}
        <a href="https://github.com/Leon31/tinooo">Github</a>
       </p>
      </div>
     </div>
    </div>
    <ModalAdd
     show={this.state.showModal}
     open={this.show.bind(this)}
     close={this.close.bind(this)}
    />
   </div>
  ) : (
   <div>
    <div className="side_button" onClick={this.props.toggle}>
     <div className="side_line" />
     <div className="side_line" />
    </div>
   </div>
  );
 }
}

export default SideBar;
