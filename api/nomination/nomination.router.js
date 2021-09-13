const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    nominateUser,fectAllNominations,patchNominationByUser
} = require("./nomination.controller");




router.put("/:id", checkToken, nominateUser);
router.get("/", checkToken, fectAllNominations);
router.patch("/:id",checkToken, patchNominationByUser)





module.exports = router;