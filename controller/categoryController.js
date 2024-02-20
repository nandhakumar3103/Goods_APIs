const db = require("../connection/db");

const controller = {
  async addCategory(req, res) {
    try {
      const { cat_name, cat_status, cat_image } = req.body;

      await db.query(
        `SELECT * FROM category WHERE cat_name=?`,
        [cat_name],
        (err, result) => {
          if (err) {
            res.status(401).json({ status: false, message: err });
          } else {
            if (result[0]?.cat_name) {
              res
                .status(403)
                .json({ status: false, message: "Category already exist...!" });
            } else {
              try {
                db.query(
                  `insert into category(cat_name, cat_status, cat_image) values(?, ?, ?)`,
                  [cat_name, cat_status, cat_image],
                  (err, result) => {
                    if (err) {
                      res.status(401).json({ status: false, message: err });
                    } else {
                      res.status(200).json({ status: true, message: result });
                    }
                  }
                );
              } catch (error) {
                res.status(500).json({ status: false, message: error });
              }
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async getCategory(req, res) {
    try {
      await db.query(`select * from category`, (err, result) => {
        if(err){
          res.status(403).json({status: false, message: err})
        }else{
          res.status(200).json({status: true, message: result})
        }
      })
    } catch (error) {
      res.status(500).json({status: false, message: error})
    }
  },
};

module.exports = controller;
