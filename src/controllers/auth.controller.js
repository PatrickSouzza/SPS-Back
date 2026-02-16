const authService = require("../services/auth.service");

class AuthController {
  login(req, res) {
    console.log(req.body);
    try {
      const token = authService.login(req.body);
      return res.json({ token });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();
