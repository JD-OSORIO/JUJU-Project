class UserFactory {
    static createUser(data) {
        return {
            username: data.username,
            email: data.email,
            password: data.password, // Aqui tengo en cuento que tengo que hashear en AuthService
            role: data.role || 'regular'
        };
    }
}

module.exports = UserFactory;