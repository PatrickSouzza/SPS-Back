const AuthController = require("../controllers/auth.controller");
const authService = require("../services/auth.service");

jest.mock("../services/auth.service");

describe("AuthController.login", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), 
    };
  });

  it("deve chamar authService.login com req.body e retornar token", () => {
    req.body = { email: "admin@spsgroup.com.br", password: "1234" };
    authService.login.mockReturnValue("TOKEN");

    AuthController.login(req, res);

    expect(authService.login).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ token: "TOKEN" });
  });

  it("deve retornar 400 se authService lançar erro", () => {
    req.body = { email: "admin@spsgroup.com.br", password: "1234" };
    authService.login.mockImplementation(() => {
      throw new Error("Erro de login");
    });

    AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Erro de login" });
  });
});
