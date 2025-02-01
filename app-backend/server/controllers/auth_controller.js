const authService = require('../services/auth_service');

const bcrypt = require('bcryptjs')

class AuthController {

  async login(req, res) {
    try {
        const { email, password } = req.body;

        /*Aqui decido delegar la logica de autenticacion al servicio
        para mantener el controlador limpio*/
        const response = await authService.login(email, password);
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });/* Devuelvo un error genérico para evitar exposición de detalles sensibles*/
    }
}


  async register(req, res, next) {
    try {
      /*Aqui decido utilizar esta bibliteca de encriptacion de contraseñas para evitar enviar
      un texto plano y tener seguridad en el sistema */
      req.body.password = bcrypt.hashSync(req.body.password, 12);
      /*Hago lo mismo que en el login para mantener la separación de responsabilidades.*/
      const user = await authService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}



module.exports = new AuthController();
