module.exports = app => {
    const controller = require('../controllers/nodo.js')();
  
    app.route('/api/v1/nodo')
      .post(controller.createNodo);
  }