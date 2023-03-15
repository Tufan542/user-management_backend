const router = require("express").Router();
const userServices = require("./user.services.js");
const userValidation = require("./user.validation.js");
const {
  validateBody,
  validateParams,
} = require("../../middlewares/validation.middleware.js");
const authenticate = require("../../middlewares/authentication.middleware.js");

router.route("/").get(userServices.getAllUsers);
router
  .route("/:id")
  .get(validateParams(userValidation.userParams), userServices.getSingleUser)
  .patch(
    validateParams(userValidation.userParams),
    authenticate,
    validateBody(userValidation.updateUser),
    userServices.updateUser
  )
  .delete(userServices.deleteUser);

module.exports = router;