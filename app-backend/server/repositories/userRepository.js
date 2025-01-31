const User = require('../models/user_model');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne(email);
    }

    async create(userData) {
        return await User.create(userData);
    }

    async findByEmailStrict(email) {
        return await User.findOne({ email });  
    }
}



module.exports = new UserRepository();