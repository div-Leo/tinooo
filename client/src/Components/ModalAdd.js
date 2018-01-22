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
   deny: ''
  };
 }

 keypressData = async e => {
  const keyEnter = e.which;
  await this.setState({
   [e.target.id]: e.target.value
  });
  console.log(this.state);
  if (
   keyEnter === 13 &&
   this.state.name !== '' &&
   this.state.url_link !== '' &&
   this.state.shortcut !== ''
  ) {
   let shortcutData = localStorage.getItem('userShortcuts').split(',');
   shortcutData.forEach(el => {
    let splitItem = el.split(' ');
    splitItem[0].toLowerCase() !== this.state.shortcut.toLowerCase()
     ? // send db
       false
     : this.denyEntry();
   });
  }
 };

 denyEntry = () => {
  console.log('reaching deny?');
  // TODO: function to shake modal and request new shortcut
  const element = document.querySelector('#modal');
  animations.shakeModal(element);
  this.setState({
   deny: 'Shortcut taken - Please try another'
  });
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
