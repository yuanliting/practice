'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/add', controller.home.add);
  router.get('/login', controller.home.login);
  router.post('/loginS', controller.home.loginS);
  router.get('/user', controller.home.user);
  router.get('/users', controller.home.find);
  router.get('/addUser',controller.home.addUser);
  router.post('/addUserInfo',controller.home.addUserInfo);
  router.post('/removeUser',controller.home.removeUser);
  router.post('/editUser',controller.home.editUser);
  router.get('/edit/:id',controller.home.edit);
  router.post('/editSend',controller.home.editSend);
  router.get('/logout',controller.home.logout);
  router.post('/search',controller.home.search);
};
