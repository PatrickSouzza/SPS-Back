const UserController = require("../controllers/user.controller");
const userService = require("../services/user.service");
const { success } = require("../utils/response");

jest.mock("../services/user.service");

describe("UserController", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe("findById", () => {
    it("deve chamar userService.findById e retornar o usuário", () => {
      req.params.id = 1;
      userService.findById.mockReturnValue({ id: 1, name: "admin" });

      UserController.findById(req, res);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(success({ id: 1, name: "admin" }));
    });
  });

  describe("list", () => {
    it("deve retornar lista de usuários", () => {
      const mockUsers = [{ id: 1, name: "admin" }];
      userService.list.mockReturnValue(mockUsers);

      UserController.list(req, res);

      expect(userService.list).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(success(mockUsers));
    });
  });

  describe("create", () => {
    it("deve criar usuário e retornar 201", () => {
      req.body = { name: "Teste" };
      userService.create.mockReturnValue({ id: 1, name: "Teste" });

      UserController.create(req, res, next);

      expect(userService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        success({ id: 1, name: "Teste" }, "Usuário criado com sucesso")
      );
    });

    it("deve chamar next em caso de erro", () => {
      const error = new Error("Erro");
      userService.create.mockImplementation(() => { throw error; });

      UserController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("update", () => {
    it("deve atualizar usuário existente", () => {
      req.params.id = 1;
      req.body = { name: "Novo nome" };
      userService.update.mockReturnValue({ id: 1, name: "Novo nome" });

      UserController.update(req, res);

      expect(userService.update).toHaveBeenCalledWith(1, req.body);
      expect(res.json).toHaveBeenCalledWith(
        success({ id: 1, name: "Novo nome" }, "Usuário atualizado com sucesso")
      );
    });

    it("deve retornar 404 se usuário não encontrado", () => {
      req.params.id = 2;
      userService.update.mockReturnValue(null);

      UserController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        success(null, "Usuário não encontrado")
      );
    });
  });

  describe("delete", () => {
    it("deve deletar usuário existente", () => {
      req.params.id = 1;
      userService.delete.mockReturnValue(true);

      UserController.delete(req, res);

      expect(userService.delete).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(
        success(null, "Usuário removido com sucesso")
      );
    });

    it("deve retornar 404 se usuário não encontrado", () => {
      req.params.id = 2;
      userService.delete.mockReturnValue(false);

      UserController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        success(null, "Usuário não encontrado")
      );
    });
  });
});
