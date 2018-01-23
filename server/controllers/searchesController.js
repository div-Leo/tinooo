const monk = require('monk');
const nconf = require('../configuration.js');
const db = monk(nconf.get('MONGODB_URL') || 'localhost/polipro');
// TODO: change in the real db

const User = db.get('users');

module.exports.postSearchesHistory = async ctx => {
 if ('POST' != ctx.method) return await next();
 ctx.user.searchesList.push(ctx.request.body);
 await User.update(
  { email: ctx.user.email },
  { $set: { searchesHistory: ctx.user.searchesList } }
 );
 ctx.status = 200;
};

module.exports.resetSearchesHistory = async ctx => {
 if ('DELETE' != ctx.method) return await next();
 await User.update(
  { email: ctx.user.email },
  { $set: { searchesHistory: ' ' } }
 );
 ctx.status = 200;
};
