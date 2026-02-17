
const { Router } = require("express");

const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const authMiddleware = require("./middlewares/auth.middleware");
const roleMiddleware = require("./middlewares/role.middleware");

const routes = Router();

//Public
routes.get("/", (req, res) => {
  res.send("Hello Word!");
});

//Public
routes.post("/auth/login", authController.login);

routes.use(authMiddleware);

// Protected permitido apenas para admin por meio do middleware
routes.get(
  "/users",
  roleMiddleware(["admin"]),
  userController.list
);

routes.get(
  "/users/:id",
  roleMiddleware(["admin"]),
  userController.findById
);

routes.post(
  "/users",
  roleMiddleware(["admin"]),
  userController.create
);

routes.put(
  "/users/:id",
  roleMiddleware(["admin"]),
  userController.update
);

routes.delete(
  "/users/:id",
  roleMiddleware(["admin"]),
  userController.delete
);


module.exports = routes;
