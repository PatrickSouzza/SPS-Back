function userResponseDTO(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type
    };
  }
  
  module.exports = {
    userResponseDTO
  };
  