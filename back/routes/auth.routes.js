const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/", controller.findAll);
  app.get('/api/auth/:id', controller.findOne)
  app.delete('/api/auth/:id',  controller.deleteAccount);
  app.delete('/api/auth/',  controller.deleteAll);
  app.put('/api/auth/:id',  controller.mvAccount);

};