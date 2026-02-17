const AuthService = require("../services/auth.service");
const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../repositories/user.repository");

describe("AuthService.login", () => {
  const mockUser = {
    id: 1,
    email: "admin@spsgroup.com.br",
    password: bcrypt.hashSync("1234", 8),
    type: "admin"
  };

  it("deve retornar um token válido para credenciais corretas", () => {
    userRepository.findByEmail.mockReturnValue(mockUser);

    const token = AuthService.login({ email: "admin@spsgroup.com.br", password: "1234" });

    expect(typeof token).toBe("string");

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    expect(decoded).toMatchObject({
      id: mockUser.id,
      email: mockUser.email,
      type: mockUser.type
    });
  });

  it("deve lançar erro se usuário não existir", () => {
    userRepository.findByEmail.mockReturnValue(null);

    expect(() => {
      AuthService.login({ email: "naoexiste@sps.com", password: "123456" });
    }).toThrow("Usuário não encontrado");
  });

  it("deve lançar erro se a senha estiver incorreta", () => {
    userRepository.findByEmail.mockReturnValue(mockUser);

    expect(() => {
      AuthService.login({ email: "admin@spsgroup.com.br", password: "senhaerrada" });
    }).toThrow("Senha inválida");
  });
});
