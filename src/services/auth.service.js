const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");

class AuthService {
  login({ email, password }) {
    const user = userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        type: user.type 
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return token;
  }
}

module.exports = new AuthService();
