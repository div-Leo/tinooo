import React, { Component } from 'react';
import Modal, { closeStyle } from 'simple-react-modal';

class ModalAdd extends Component {
 constructor(props) {
  super(props);
  this.state = {
   shortcut: '',
   url_link: ''
  };
 }

 enterKey = e => {
  this.setState({
   [e.target.id]: e.target.value
  });
  console.log(this.state);
  if (
   e.which === 13 &&
   this.state.url_link !== '' &&
   this.state.shortcut !== ''
  ) {
   // send db
  }
 };

 closeModal = f => {
  this.setState({
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
     <div
      onKeyUp={e => this.enterKey(e)}
      style={{ display: 'flex', flexDirection: 'column' }}
     >
      <span
       style={{
        fontFamily: 'Avenir',
        fontWeight: 800,
        fontSize: '1.8em',
        marginBottom: '10px'
       }}
      >
       New Shortcut:
      </span>
      <span
       style={{
        color: '#aaa',
        fontFamily: 'Avenir',
        fontWeight: 300,
        marginBottom: '10px',
        fontSize: '1.1em'
       }}
      >
       Insert the url of the website you'd like to add and assign it to a
       letter.
      </span>
      <div
       style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
       <h2
        style={{
         fontFamily: 'Avenir',
         color: '#aaa',
         fontWeight: '300',
         marginRight: '10px'
        }}
       >
        URL:
       </h2>
       <input
        id="url_link"
        style={{
         marginLeft: '10px',
         width: '600px',
         height: '40px',
         outlineColor: 'none',
         border: 'none',
         boxShadow: '0 0 5px 2px rgba(50,50,50,0.1)',
         outlineOffset: 'none',
         outline: 'none',
         outlineColor: 'none',
         fontSize: '1.2em',
         paddingLeft: '15px'
        }}
       />
      </div>
      <div
       style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
       <h2
        style={{
         fontFamily: 'Avenir',
         color: '#aaa',
         fontWeight: '300',
         marginRight: '10px'
        }}
       >
        CTRL +
       </h2>
       <input
        maxLength={1}
        id="shortcut"
        style={{
         paddingLeft: '20px',
         marginLeft: '10px',
         width: '40px',
         height: '40px',
         outlineColor: 'none',
         border: 'none',
         boxShadow: '0 0 5px 2px rgba(50,50,50,0.1)',
         outlineOffset: 'none',
         outline: 'none',
         outlineColor: 'none',
         fontSize: '1.2em',
         textTransform: 'uppercase'
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
