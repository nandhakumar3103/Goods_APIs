const db = require('../../connection/db')

const controller = {
    async userRegister(req, res) {
        try {
            const { user_name, user_email, password } = req.body;
            db.query('SELECT * FROM user_register WHERE user_email = ?', [user_email], (err, results) => {
                if (err) {
                    res.status(401).json({ status: false, message: err });
                } else if (results.length > 0) {
                    res.status(409).send('User already exists');
                } else {
                    db.query('INSERT INTO user_register (user_name, user_email, password) values(?,?,?)', [user_name, user_email, password], (err, data) => {
                        if (err) {
                            res.status(401).json({ status: false, message: err });
                        } else {
                            res.status(200).send({ status: true, message: 'Registration successful', data });
                        }
                    });
                }
            });
        } catch (error) {
            res.status(500).json({ status: false, message: error });
        }
    },

    async login(req, res) {
        try {
            const { user_email, password } = req.body;
            connection.query(`SELECT * FROM user_register WHERE user_email=?`, [user_email], (error, results) => {
                if (error) return res.status(500).json({ status: 500, message: error })
                else if (results.length > 0)
                    connection.query(`SELECT * FROM user_register WHERE user_email=? AND password=?`, [user_email, password], (error, count) => {
                        if (error) return res.status(500).json({ status: 500, message: error })
                        else if (count.length > 0) {
                            let [user] = results
                            let Tokenstatus = jwtToken.verify(user.token)
                            if (Tokenstatus == "jwt expired") {
                                Tokenstatus = jwtToken.token(data.email)
                                connection.query(`UPDATE user_register SET token=? WHERE user_email=?`, [Tokenstatus, user_email])
                            }
                            return res.status(200).json({ status: 200, message: Tokenstatus })
                        } else return res.status(400).json({ status: 400, message: 'Kindly check your password' });
                    })
                else return res.status(404).json({ status: 404, message: 'Email not exists' });
            });
        } catch (error) {
            res.status(500).json({ status: false, message: error });
        }
    },

    async getUsers(req, res) {
        try {
            db.query(`SELECT * FROM user_register`, (err, result) => {
                if (err) {
                    res.status(401).json({ status: false, message: err });
                } else {
                    res.status(200).json({ status: true, message: 'Success', result });
                }
            })

        } catch (error) {
            res.status(500).json({ status: false, message: error });
        }
    }

}

module.exports = controller