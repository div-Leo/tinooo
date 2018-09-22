const nconf = require('./configuration.js');
const monk = require('monk');
const db = monk(process.env.MONGOLAB_URI || 'localhost/tinooo');
const User = db.get('users');

module.exports = async (ctx, next) => {
    let auth = ctx.headers.authorization;
    if (!auth || auth.split(' ')[0] != 'Bearer') return await next();
    ctx.token = auth.split(' ')[1];
    ctx.user = await User.findOne({
        accessToken: ctx.token
    });
    await next();
}