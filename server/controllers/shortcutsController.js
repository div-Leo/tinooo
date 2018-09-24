const monk = require('monk');
const nconf = require('../configuration.js');
const db = monk(process.env.MONGOLAB_URI || 'localhost/tinooo');
// TODO: change in the real db

const User = db.get('users');

module.exports.postShortcuts = async ctx => {
    if ('POST' != ctx.method) return await next();
    ctx.user.shortcutsList.push(ctx.request.body.shortcut);
    await User.update({
        email: ctx.user.email
    }, {
        $set: {
            shortcutsList: ctx.user.shortcutsList
        }
    });
    ctx.status = 200;
};

module.exports.editShortcuts = async ctx => {
    if ('PUT' != ctx.method) return await next();
    await User.update({
        email: ctx.user.email
    }, {
        $set: {
            shortcutsList: ctx.request.body
        }
    });
    ctx.status = 200;
};

module.exports.resetShortcuts = async ctx => {
    if ('DELETE' != ctx.method) return await next();
    await User.update({
        email: ctx.user.email
    }, {
        $set: {
            shortcutsList: []
        }
    });
    ctx.status = 200;
};