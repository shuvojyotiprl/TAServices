const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    fetchAllSkills, fetchSkillsById
} = require("./skills.controller");




router.get("/:id", checkToken, fetchSkillsById);
router.get("/", checkToken, fetchAllSkills);




module.exports = router;