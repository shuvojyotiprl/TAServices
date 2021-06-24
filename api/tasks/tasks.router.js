const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createNewTask,
  findTaskById,
  findAllTaks,
  updateTask
} = require("./tasks.controller");



router.post("/",checkToken, createNewTask);
router.get("/:id", checkToken, findTaskById); 
router.get("/", checkToken, findAllTaks); 
router.patch("/:id", checkToken, updateTask);



module.exports = router;
