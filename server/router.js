export default function (router) {

  router.get('/api/users/', router.wrapAsync(router.action('api/users').get));
  router.post('/api/users/', router.wrapAsync(router.action('api/users').create));
  router.delete('/api/users/', router.wrapAsync(router.action('api/users').remove));
  router.put('/api/users/', router.wrapAsync(router.action('api/users').update));

  router.get('/api/products/', router.wrapAsync(router.action('api/products').get));

  router.get('*', (req,res) => {res.render('dva/page/index.tpl')});
};