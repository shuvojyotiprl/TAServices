const {
    nominate, fetchAllNominations, startLearning
} = require("./nomination.service");

const logger = require("./../log/logger")

module.exports = {
    nominateUser: (req, res) => {
        const user = req.decoded.result;
        const skillId = req.params.id;

        nominate(user, skillId, (err, results) => {
            if (err) {

                logger.info(err);
                return res.status(404).json({
                    success: 0,
                    message: "not found",
                    details: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })

    },
    fectAllNominations: (req, res) => {
        const user = req.decoded.result;
        fetchAllNominations(user, (err, results) => {
            if (err) {

                logger.info(err);
                return res.status(500).json({
                    success: 0,
                    message: "server error",
                    details: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    patchNominationByUser: (req, res) => {
        const user = req.decoded.result;
        const skillId = req.params.id;
        startLearning(user, skillId, (err, results) => {
            if (err) {

                logger.info(err);
                return res.status(500).json({
                    success: 0,
                    message: "server error",
                    details: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }
}