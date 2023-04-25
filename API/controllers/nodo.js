module.exports = () => {
    const usuariosDB = require('../data/users.json');
    const controller = {};
  
    controller.listUser = (req, res) => res.status(200).json(usuariosDB); //GET User infos
    
    controller.createUser = (req, res) => {
        
    }
    return controller;
  }