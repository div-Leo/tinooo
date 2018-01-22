import React, { Component } from 'react';
import Modal, { closeStyle } from 'simple-react-modal';

import './ModalAdd.css';

class ModalAdd extends Component {
 constructor(props) {
  super(props);
  this.state = {
   name: '',
   shortcut: '',
   url_link: ''
  };
 }

 keypressData = async e => {
  await this.setState({
   [e.target.id]: e.target.value
  });
  await console.log(this.state);
  if (
   e.which === 13 &&
   this.state.name !== '' &&
   this.state.url_link !== '' &&
   this.state.shortcut !== ''
  ) {
   let shortcutData = localStorage.getItem('userShortcuts');
   console.log(shortcutData);
   shortcutData.forEach(el => {
    let splitItem = el.split(' ');
    splitItem[0] !== this.state.shortcut
     ? // send db
       false
     : false;
   });
  }
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
      </div>
     </div>
    </Modal>
   </div>
  );
 }
}

export default ModalAdd;
