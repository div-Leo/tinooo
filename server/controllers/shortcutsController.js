const monk = require('monk');
const nconf = require('../configuration.js');
const db = monk(nconf.get('MONGODB_URL') || 'localhost/polipro');

const User = db.get('users');


module.exports.getShortcuts = async (ctx) =>{

};

module.exports.postShortcuts = async (ctx) =>{

};

module.exports.deleteShortcuts = async (ctx) =>{

};

module.exports.editShortcuts = async (ctx) =>{

};
