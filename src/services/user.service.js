const userRepository = require("../repositories/user.repository");
const { userResponseDTO } = require("../dtos/user.dto");
const bcrypt = require("bcryptjs");

class UserService {
  findById(id){
    const user = userRepository.findById(id)
    return userResponseDTO(user)
  }

  list() {
    const users = userRepository.findAll()
    return users.map(userResponseDTO)
  }

  create({ email, name, type, password }) {
    const emailExists = userRepository.findByEmail(email);
  
    if (emailExists) {
      throw new Error("Email já cadastrado");
    }
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    const newUser = userRepository.create({
      email,
      name,
      type,
      password: hashedPassword
    });
  
    return userResponseDTO(newUser);
  }  

  update(id, data) {
    return userRepository.update(id, data);
  }

  delete(id) {
    return userRepository.delete(id);
  }
}

module.exports = new UserService();
