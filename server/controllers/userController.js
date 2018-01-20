const nconf = require('../configuration.js');
const config = require('../config.js');
const monk = require('monk');
const db = monk(nconf.get('MONGODB_URL') || 'localhost/polipro');

const User = db.get('users');

const userDB = async (userData) => {
  let user = await User.findOne({facebook_id: userData.facebook_id});
  if (!user) {
    try {
      user = await User.insert(userData);
      return user.accessToken;
    } catch (e) { console.error('User.insert', e); }
  } else {
    try {
      await User.update({facebook_id: userData.facebook_id}, {'name': userData.name, 'email': userData.email, 'accessToken': userData.accessToken, 'profile_picture': userData.profile_picture});
      user = await User.findOne({facebook_id: userData.facebook_id});
      return user.accessToken;
    } catch(e) { console.error('User.update', e); }
  }
}


module.exports.authFacebook = async (ctx, next) => {
  if ('POST' != ctx.method) return await next();
  let facebookUserData = {'name': ctx.request.body.name, 'email': ctx.request.body.email, 'facebook_id': ctx.request.body.id, 'accessToken': ctx.request.body.accessToken, 'profile_picture': ctx.request.body.picture.data.url};
  // console.log('authFacebook', facebookUserData.id);
  let authResult = await axios.get(config.facebook.validateUrl, {
    headers: {
      'Authorization': 'Bearer ' + facebookUserData.accessToken,
    }
  });
  // console.log('authResult', authResult.data);
  if (authResult.data.id == facebookUserData.facebook_id) {
    await userDB(facebookUserData);
    ctx.status = 200;
    ctx.body = JSON.stringify({'accessToken': facebookUserData.accessToken});
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
