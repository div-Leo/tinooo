const Router = require('koa-router');
const router = new Router();
const userCtrl = require('./controllers/userController');
const scCtrl = require('./controllers/shortcutsController');

const authorize = async (ctx, next) => {
  if (!ctx.user) {
    ctx.status = 401;
    return;
  }
  await next();
};

router.get('/login', authorize, userCtrl.login)
  .post('/auth/facebook', userCtrl.authFacebook)
  .get('/logout', userCtrl.logout)
  .post('/auth/google', userCtrl.authGoogle)

  .get('/shortcuts', scCtrl.getShortcuts)
  .post('/shortcuts', scCtrl.postShortcuts)
  .delete('/shortcuts', scCtrl.deleteShortcuts)
  .put('/shortcuts', scCtrl.editShortcuts)

module.exports = router;
