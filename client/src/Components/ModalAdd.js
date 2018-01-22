import React, { Component } from 'react';
import Modal, { closeStyle } from 'simple-react-modal';
import animations from '../animations';

import './ModalAdd.css';

class ModalAdd extends Component {
 constructor(props) {
  super(props);
  this.state = {
   name: '',
   shortcut: '',
   url_link: '',
   deny: '',
   db_shortcuts: ''
  };
 }

 keypressData = async e => {
  const keyEnter = e.which;
  await this.setState({
   [e.target.id]: e.target.value
  });

  if (
   keyEnter === 13 &&
   this.state.name !== '' &&
   this.state.url_link !== '' &&
   this.state.shortcut !== ''
  ) {
   let shortcutData = localStorage.getItem('userShortcuts').split(',');
   let taken = shortcutData.some(el => {
    let splitItem = el.split(' ');
    return splitItem[0].toLowerCase() === this.state.shortcut.toLowerCase();
   });
   !taken
    ? this.sendShortcutDB(
       `${this.state.shortcut} ${this.state.url_link} ${this.state.name}`
      )
    : this.denyEntry();
  }
 };

 denyEntry = () => {
  // TODO: function to shake modal and request new shortcut
  const element = document.querySelector('#modal');
  animations.shakeModal(element);
  this.setState({
   deny: 'Shortcut taken - Please try another'
  });
 };

 sendShortcutDB = async str => {
  await fetch('http://localhost:3001/shortcuts', {
   method: 'POST',
   body: JSON.stringify({ shortcut: str }),
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
   }
  })
   .then(res => res.json())
   .then(data => this.concatShortcuts(str));
  // .then(data => localStorage.setItem('userShortcuts', data));
 };

 concatShortcuts = async str => {
  let localShortcuts = await localStorage.getItem('userShortcuts');
  let data = localShortcuts.split(',');
  data.push(str);
  let newData = data.join(',');
  await localStorage.setItem('userShortcuts', newData);
 };

 closeModal = f => {
  this.setState({
   name: '',
   shortcut: '',
   url_link: ''
  });
  f();
 };

 render() {
  return (
   <div className="modal_window">
    <Modal
     id="full_modal"
     closeOnOuterClick={true}
     onClose={() => this.closeModal(this.props.close)}
     style={{}}
     containerStyle={{ width: '40vw', padding: '30px 40px' }}
     show={this.props.show}
    >
     <div id="modal" onKeyUp={e => this.keypressData(e)} className="modal_item">
      <span className="modal_title">New Shortcut:</span>
      <span className="modal_text">
       Insert the url of the website you'd like to add and assign it to a
       letter.
      </span>
      <div className="modal_subtitle_item">
       <h2 className="modal_subtitle_text">Name:</h2>
       <input id="name" className="modal_input" />
      </div>
      <div className="modal_subtitle_item">
       <h2 className="modal_subtitle_text">URL:</h2>
       <input id="url_link" className="modal_input" />
      </div>
      <div className="modal_subtitle_item">
       <h2 className="modal_subtitle_text">CTRL +</h2>
       <input
        maxLength={1}
        id="shortcut"
        className="modal_input modal_input--ctrl"
       />
       <span className="modal_deny_text">{this.state.deny}</span>
      </div>
     </div>
    </Modal>
   </div>
  );
 }
}

export default ModalAdd;
