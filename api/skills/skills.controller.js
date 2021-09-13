const {
    getSkills,
    getSkillsById
} = require("./skills.service");

const logger = require("./../log/logger")

module.exports = {
    fetchAllSkills: (req, res) => {
        const user = req.decoded.result;

        getSkills(user,(err, results) => {
            if (err) {

                logger.info(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database errror",
                    details: err.sqlMessage
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })

    },
    fetchSkillsById: (req, res) => {
        const user = req.decoded.result;
        const skillId = req.params.id;

        logger.info('Skill Id =>' + skillId)

        getSkillsById(user,skillId, (err, results) => {
            if (err) {

                logger.info(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database errror",
                    details: err.sqlMessage
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })

    }
}