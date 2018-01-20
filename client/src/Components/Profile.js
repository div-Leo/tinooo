import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import empty_profile from '../images/profile_icon.png'
import './Profile.css';

class Profile extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 // Facebook
 responseFb = response => {
   console.log(response);
  fetch('http://localhost:3001/auth/facebook', {
   method: 'POST',
   body: JSON.stringify(response),
   headers: new Headers({
    'Content-Type': 'application/json'
   })
  })
   .then(res => res.json())
   .then(data => {
    localStorage.setItem('accessToken', data.accessToken);
    this.login();
   });
 };

 login = async () => {
   if (localStorage.getItem('accessToken')) {
    fetch('http://localhost:3001/login', {
     headers: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
     }
    })
     .then(res => res.json())
     .then(data => {
        this.setState({
          user: data,
          logged: true
        })
        localStorage.setItem('userSearches', data.searches);
        localStorage.setItem('userShortcuts', data.shortcuts);
      }
     );
   }
 };

 logout  = () => {
  localStorage.removeItem('accessToken');
}

 renderProfile = open => {
  return this.state.logged === true ? (
   <div className="profile_container">
     <img className="profile_img" src={this.state.user.profile_picture} />
     <div className="profile_login profile_login--logged">
      <div className="profile_name">{this.state.user.name}</div>
      <div className="profile_email">{this.state.user.email}</div>
     </div>
   </div>
  ) : (
   <div className="profile_container">
    <img className="profile_img" src={empty_profile}/>
    {/* onClick={() => this.logout()}  */}
    <div className="profile_login">
     <div className="profile_login_text">Login with:</div>
     <FacebookLogin
       cssClass="profile_login_button"
      appId="180949189168618"
      autoLoad={true}
      fields="name, email, picture"
      scope="public_profile,user_friends,user_actions.books,email"
      callback={this.responseFb}
      textButton=""
      icon="fa-facebook"
     />
    </div>
   </div>
  );
 };

 // RENDER =========================
 render() {
  return <div> {this.renderProfile(this.state.logged)}</div>;
 }
}

export default Profile;
