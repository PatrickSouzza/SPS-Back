const userService = require("../services/user.service");
const { success } = require("../utils/response");

class UserController {
  findById(req,res){
    console.log(req)
    const user = userService.findById(req.params.id)
    return res.json(success(user))
  }

  list(req, res) {
    const users = userService.list();
    return res.json(success(users));
  }

  create(req, res, next) {
    try {
      const user = userService.create(req.body);
      return res.status(201).json(success(user, "Usuário criado com sucesso"));
    } catch (err) {
      next(err);
    }
  }  

  update(req, res) {
    const user = userService.update(req.params.id, req.body);

    if (!user) {
      return res.status(404).json(success(null, "Usuário não encontrado"));
    }

    return res.json(success(user, "Usuário atualizado com sucesso"));
  }

  delete(req, res) {
    const deleted = userService.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json(success(null, "Usuário não encontrado"));
    }

    return res.json(success(null, "Usuário removido com sucesso"));
  }
}

module.exports = new UserController();
