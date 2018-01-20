const nconf = require('../configuration.js');
const config = require('../config.js');
const axios = require('axios');
const monk = require('monk');
const db = monk(nconf.get('MONGODB_URL') || 'localhost/polipro');
var GoogleAuth = require('google-auth-library');

const User = db.get('users');

const userDB = async (userData) => {
  let user = await User.findOne({social_id: userData.id});
  if (!user) {
    try {
      user = await User.insert(userData);
      return user.accessToken;
    } catch (e) { console.error('User.insert', e); }
  } else {
    try {
      await User.update({social_id: userData.id}, {'name': userData.name, 'email': userData.email, 'accessToken': userData.accessToken, 'profile_picture': userData.profile_picture});
      user = await User.findOne({social_id: userData.id});
      return user.accessToken;
    } catch(e) { console.error('User.update', e); }
  }
}


module.exports.authFacebook = async (ctx, next) => {
  if ('POST' != ctx.method) return await next();
  let facebookUserData = {'name': ctx.request.body.name, 'email': ctx.request.body.email, 'id': ctx.request.body.id, 'accessToken': ctx.request.body.accessToken, 'profile_picture': ctx.request.body.picture.data.url};
  let authResult = await axios.get(config.facebook.validateUrl, {
    headers: {
      'Authorization': 'Bearer ' + facebookUserData.accessToken,
    }
  });
  if (authResult.data.id == facebookUserData.id) {
    await userDB(facebookUserData);
    ctx.status = 200;
    ctx.body = JSON.stringify({'accessToken': facebookUserData.accessToken});
  } else ctx.status = 404;
};

module.exports.authGoogle = async (ctx, next) => {
  if ('POST' != ctx.method) return await next();
  let googleUserData = {'name': ctx.request.body.profileObj.name, 'email': ctx.request.body.profileObj.email, 'id': ctx.request.body.profileObj.googleId, 'accessToken': ctx.request.body.Zi.access_token, 'profile_picture': ctx.request.body.profileObj.imageUrl};
  let authResult = await axios.get(config.google.validateUrl + ctx.request.body.tokenId, {
    headers: {
      'Authorization': 'Bearer ' + googleUserData.accessToken,
    }
  });
  if (authResult.data.sub == googleUserData.id) {
    await userDB(googleUserData);
    ctx.status = 200;
    console.log(googleUserData.accessToken);
    ctx.body = JSON.stringify({'accessToken': googleUserData.accessToken});
  } else ctx.status = 404;
};

module.exports.login = async (ctx, next) => {
  if ('GET' != ctx.method) return await next();
  console.log('login', ctx.user);
  ctx.body = ctx.user;
  ctx.status = 200;
}

module.exports.logout = async (ctx, next) => {
  if ('GET' != ctx.method) return await next();
  ctx.status = 201;
};
