import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import empty_profile from '../images/profile_icon.png'
import GoogleLogin from 'react-google-login';
import GoogleIcon from 'react-icons/lib/fa/google';
import './Profile.css';

class Profile extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 // Facebook
 responseFb = response => {
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

 responseGoogle = response => {
  fetch('http://localhost:3001/auth/google', {
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
     });
     localStorage.setItem('userSearches', data.searches);
     localStorage.setItem('userShortcuts', data.shortcuts);
    });
  }
 };

 logout = () => {
  localStorage.removeItem('accessToken');
 };

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
    <img className="profile_img" src={empty_profile} />
    {/* onClick={() => this.logout()}  */}
    <div className="profile_login">
     <div className="profile_login_text">Login with:</div>
     <FacebookLogin
       cssClass="profile_login_button profile_login_button--facebook"
      appId="180949189168618"
      autoLoad={true}
      fields="name, email, picture"
      scope="public_profile,user_friends,user_actions.books,email"
      callback={this.responseFb}
      textButton=""
      icon="fa-facebook"
     />
     <div className="profile_login_text">or</div>
     <GoogleLogin
        clientId="1089959983020-u8m1st89h7r4psfk2n4tdeq8ugkb7g62.apps.googleusercontent.com"
        buttonText="G+"
        className="profile_login_button profile_login_button--google"
        scope="profile email"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      ></GoogleLogin>
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
