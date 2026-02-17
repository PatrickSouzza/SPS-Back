const UserService = require("../services/user.service");
const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcryptjs");
const { userResponseDTO } = require("../dtos/user.dto");

jest.mock("../repositories/user.repository");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    it("deve retornar um usuário transformado com userResponseDTO", () => {
      const mockUser = { id: 1, name: "Admin", email: "admin@sps.com", type: "admin" };
      userRepository.findById.mockReturnValue(mockUser);

      const result = UserService.findById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(userResponseDTO(mockUser));
    });
  });

  describe("list", () => {
    it("deve retornar lista de usuários transformada com userResponseDTO", () => {
      const mockUsers = [
        { id: 1, name: "Admin", email: "admin@sps.com", type: "admin" },
        { id: 2, name: "User", email: "user@sps.com", type: "user" }
      ];
      userRepository.findAll.mockReturnValue(mockUsers);

      const result = UserService.list();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers.map(userResponseDTO));
    });
  });

  describe("create", () => {
    it("deve criar usuário com senha hash e retornar userResponseDTO", () => {
      const input = { email: "novo@sps.com", name: "Novo", type: "user", password: "123456" };
      userRepository.findByEmail.mockReturnValue(null);
      userRepository.create.mockImplementation((data) => ({ id: 1, ...data }));

      const result = UserService.create(input);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
      expect(result).toHaveProperty("id", 1);
      expect(bcrypt.compareSync(input.password, result.password)).toBe(false);
    });

    it("deve lançar erro se email já existir", () => {
      userRepository.findByEmail.mockReturnValue({ id: 1, email: "exist@sps.com" });

      expect(() => {
        UserService.create({ email: "exist@sps.com", name: "X", type: "user", password: "123" });
      }).toThrow("Email já cadastrado");
    });
  });

  describe("update", () => {
    it("deve chamar userRepository.update com id e dados", () => {
      const data = { name: "Novo Nome" };
      userRepository.update.mockReturnValue({ id: 1, ...data });

      const result = UserService.update(1, data);

      expect(userRepository.update).toHaveBeenCalledWith(1, data);
      expect(result).toEqual({ id: 1, ...data });
    });
  });

  describe("delete", () => {
    it("deve chamar userRepository.delete com id", () => {
      userRepository.delete.mockReturnValue(true);

      const result = UserService.delete(1);

      expect(userRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });
});
