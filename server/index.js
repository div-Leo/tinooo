require('dotenv').config();
const cors = require('koa-cors');
const compress = require('koa-compress');
const bodyparser = require('koa-bodyparser');

const router = require('./router.js');
const authMiddleware = require('./authMiddleware.js');

const Koa = require('koa');
const app = new Koa();

app
    .use(cors())
    .use(compress())
    .use(bodyparser())
    .use(authMiddleware)
    .use(router.routes())
    .listen(process.env.PORT || 3001);