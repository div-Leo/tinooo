require('dotenv').config();
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');
const router = require('./router.js');

const Koa = require('koa');
const app = new Koa();

const nconf = require('./configuration.js');
const monk = require('monk');
const db = monk(process.env.MONGOLAB_URI || 'localhost/tinooo');
const User = db.get('users');

app
 .use(cors())
 .use(bodyparser())
 .use(async (ctx, next) => {
  let authorization = ctx.headers.authorization;
  if (!authorization || authorization.split(' ')[0] != 'Bearer')
   return await next();
  ctx.token = authorization.split(' ')[1];
  ctx.user = await User.findOne({ accessToken: ctx.token });
  console.log('USER ====== ',ctx.user);
  return await next();
 })
 .use(router.routes())
 .listen(3001);
