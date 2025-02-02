const userService = require('../services/user_service');

class UserController{
      async updateUser(req, res, next) {
        try {
            const { id } = req.params; // Extraigo ID de la URL
            const updatedUser = await userService.updateUser(id, req.body, req.user); 
    
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
    
    async getUserById(req, res, next) {
      try {
          const { id } = req.params;
    
          if (!id) {
              throw new AppError('ID de usuario requerido', 400);
          }
    
          const response = await userService.getUserById(id);
          res.json(response);
      } catch (error) {
          next(error);
      }
    }
    
    
      async deleteUser(req, res, next) {
        try {
            const { id } = req.params
        
            const response = await userService.deleteUser(id);
            res.json(response);
        } catch (error) {
            next(error);
        }
      }
    
      async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();