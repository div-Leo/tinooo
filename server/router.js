const Router = require('koa-router');
const router = new Router();
const userCtrl = require('./controllers/userController');

const authorize = async (ctx, next) => {
  if (!ctx.user) {
    ctx.status = 401;
    return;
  }
  await next();
};

router.get('/login', authorize, usersController.login),
  .post('/auth/facebook', usersController.authFacebook),
  .get('/logout', usersController.logout),
  // .post('/auth/google', usersController.authGoogle),
  .get('/me', authorize, usersController.me);

module.exports = router;
