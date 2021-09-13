const pool = require("../../config/database");

const logger = require("./../log/logger")
const skillSerice = require("./../skills/skills.service")


module.exports = {




    nominate: (user, skill_id, callBack) => {

        skillSerice.getSkillsById(user, skill_id, (err, results) => {
            if (err) {
                return callBack(err)
            }
            if (results == null || results == [] || results == "") {
                return callBack("invalid skill id : " + skill_id, results)
            }


            var now = new Date();
            var nomination_date = [
                now.getFullYear(), '-', now.getMonth(), '-', now.getDate(), ' ', now.getHours(), ':', now.getMinutes(), ':'
                , now.getSeconds()
            ].join('')



            pool.query(
                `insert into nomination(skill_id,user_id,nomination_date,completion_date,percentile,status) 
                          values(?,?,?,?,?,?)`,
                [
                    skill_id,
                    user.id,
                    nomination_date,
                    null,
                    null,
                    null
                ],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    else {
                        return callBack(null, results);
                    }

                }
            );

        })

    },

    fetchAllNominations: (user, callBack) => {

        pool.query(
            `select skill_id,user_id,nomination_date,completion_date,percentile,status from nomination
            where user_id=?`,
            [
                user.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                else {
                    return callBack(null, results);
                }

            }
        );

    },
    startLearning: (user, skill_id, callBack) => {

        pool.query(
            `select skill_id,user_id,nomination_date,completion_date,percentile,status from nomination
            where user_id=? and skill_id=?`,
            [
                user.id,
                skill_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                else {
                    if (results == null || results == [] || results == "") {
                        return callBack("No active nomination found ", user.id, skill_id)
                    }

                    pool.query(
                        `update nomination set status='IN_PROGRESS'  where user_id=? and skill_id=? `, [user.id,
                        skill_id], (error, results, fields) => {
                            if (error) {
                                return callBack(error);
                            }
                            return callBack(null, results);
                        }
                    )


                }

            }
        );

    }
}