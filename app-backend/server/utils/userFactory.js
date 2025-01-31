class UserFactory {
    static createUser(data) {
        return {
            username: data.username,
            email: data.email,
            password: data.password, // Se debe hashear en AuthService
            role: data.role || 'regular'
        };
    }
}

module.exports = UserFactory;