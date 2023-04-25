module.exports = app => {
    const controller = require('../controllers/nodo.js')();
  
    app.route('/API/v1/nodo')
      .get(controller.listUser)
      .post(controller.createUser);
  }