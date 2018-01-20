import React, { Component } from 'react';
import Modal, { closeStyle } from 'simple-react-modal';

class ModalAdd extends Component {
 constructor(props) {
  super(props);
 }

 render() {
  return (
   <div className="modal_window">
    <Modal
     closeOnOuterClick={true}
     onClose={this.props.close}
     style={{}}
     containerStyle={{ width: '40vw' }}
     show={this.props.show}
    >
     <div className="modal_subwindow">
      <h1 style={{ fontFamily: 'Avenir' }}>New Shortcut:</h1>
      <h3
       style={{
        color: '#aaa',
        fontFamily: 'Avenir',
        fontWeight: 300,
        paddingTop: 0
       }}
      >
       Insert the url of the website you'd like to add and assign it to a
       letter.
      </h3>
      <div
       style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
       <h2 style={{ fontFamily: 'Avenir' }}>URL:</h2>
       <input
        style={{
         marginLeft: '10px',
         width: '600px',
         height: '40px',
         outlineColor: 'none',
         border: 'none',
         boxShadow: '0 0 5px 2px rgba(50,50,50,0.1)',
         outlineOffset: 'none',
         outline: 'none',
         outlineColor: 'none'
        }}
       />
      </div>
      <div
       style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
       <h2 style={{ fontFamily: 'Avenir' }}>CTRL +</h2>
       <input
        style={{
         marginLeft: '10px',
         width: '100px',
         height: '40px',
         outlineColor: 'none',
         border: 'none',
         boxShadow: '0 0 5px 2px rgba(50,50,50,0.1)',
         outlineOffset: 'none',
         outline: 'none',
         outlineColor: 'none'
        }}
        className="modal_input_ctrl"
       />
      </div>
     </div>
    </Modal>
   </div>
  );
 }
}

export default ModalAdd;
