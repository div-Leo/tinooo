const Router = require('koa-router');
const router = new Router();
const userCtrl = require('./controllers/userController');
const shortcutCtrl = require('./controllers/shortcutsController');
const searchesCtrl = require('./controllers/searchesController');

const authorize = async (ctx, next) => {
 if (!ctx.user) {
  ctx.status = 401;
  return;
 }
 await next();
};

router
 .get('/login', authorize, userCtrl.login)
 .post('/auth/facebook', userCtrl.authFacebook)
 .post('/auth/google', userCtrl.authGoogle)

 .post('/shortcuts', authorize, shortcutCtrl.postShortcuts)
 .put('/shortcuts', authorize, shortcutCtrl.editShortcuts)
 .delete('/shortcuts', authorize, shortcutCtrl.resetShortcuts)

 .post('/searches', authorize, searchesCtrl.postSearchesHistory)
 .delete('/searches', authorize, searchesCtrl.resetSearchesHistory);

module.exports = router;
