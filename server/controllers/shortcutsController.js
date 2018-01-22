const monk = require('monk');
const nconf = require('../configuration.js');
const db = monk(nconf.get('MONGODB_URL') || 'localhost/polipro');

const Sc = db.get('shortcuts');


module.exports.getShortcuts = async (ctx, next) =>{
  if ('GET' != ctx.method) return await next();
  const res = await Sc.find();
  ctx.response.body =  res.sort(function (a, b){return  b.score - a.score});
  ctx.status=200;
};

module.exports.postShortcuts = async (ctx) =>{

};

module.exports.deleteShortcuts = async (ctx) =>{

};

module.exports.editShortcuts = async (ctx) =>{

};
