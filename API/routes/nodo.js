module.exports = app => {
    const controller = require('../controllers/nodo.js')();
  
    app.route('/API/v1/listUser')
      .get(controller.listUser)
    
    app.route('API/v1/createUser')
      .post(controller.createUser);
  }