const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  getMyDetails,
  logout
} = require("./user.controller");


router.get("/all", checkToken, getUsers);  //admin restricted
router.post("/", createUser);
router.get("/id/:id", checkToken, getUserByUserId);  //admin restricted
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);
router.get("/", checkToken, getMyDetails); 
router.post("/logout",checkToken,logout)



module.exports = router;
