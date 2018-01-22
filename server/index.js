const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');
const router = require('./router.js');

const Koa = require('koa');
const app = new Koa();

const monk = require('monk');
const nconf = require('./configuration.js');
const db = monk(nconf.get('MONGODB_URL') || 'localhost/polipro');
const User = db.get('users');

app
 .use(cors())
 .use(bodyparser())
 .use(async (ctx, next) => {
  console.log('AUTH HEADER!=====', ctx.headers.authorization);
  let authorization = ctx.headers.authorization;
  if (!authorization || authorization.split(' ')[0] != 'Bearer')
   return await next();
  ctx.token = authorization.split(' ')[1];
  console.log('CTX TOKEN=========', ctx.token);
  ctx.user = await User.findOne({ accessToken: ctx.token });
  console.log('CTX USER============', ctx.user);
  return await next();
 })
 .use(router.routes())
 .listen(3001);
