const pool = require("../../config/database");


module.exports = {




    getSkills: (user, callBack) => {
        pool.query(
            `select skill_id,skill_name,training_cost,duration from skills`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSkillsById: (user, skillId, callBack) => {
        pool.query(
            `select skill_id,skill_name,training_cost,duration from skills where skill_id=?`,
            [skillId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

}