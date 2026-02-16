const users = require("../database/users");

class UserRepository {
  findAll() {
    return users;
  }

  findById(id) {
    return users.find(u => u.id === Number(id));
  }

  findByEmail(email) {
    return users.find(u => u.email === email);
  }

  create(user) {
    user.id = users.length + 1;
    users.push(user);
    return user;
  }

  update(id, data) {
    const user = this.findById(id);
    if (!user) return null;

    Object.assign(user, data);
    return user;
  }

  delete(id) {
    const index = users.findIndex(u => u.id === Number(id));
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  }
}

module.exports = new UserRepository();
