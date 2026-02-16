const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: bcrypt.hashSync("1234", 10)
  }
];

module.exports = users;