const authService = require('../services/auth_service');

const bcrypt = require('bcryptjs')

class AuthController {

  async login(req, res) {
    try {
        const { email, password } = req.body;

        const response = await authService.login(email, password);
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


  async register(req, res, next) {
    try {
      
      req.body.password = bcrypt.hashSync(req.body.password, 12);
        
      const user = await authService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }


}



module.exports = new AuthController();
