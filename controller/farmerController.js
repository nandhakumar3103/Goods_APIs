const db = require("../connection/db");

const controller = {
  async farmerAddProducts(req, res) {
    try {
      const {
        category,
        farmerName,
        productName,
        productDetails,
        productQuantity,
        address,
        pincode,
        mobileNo,
        altertiveMobileNo,
        email,
      } = req.body;

      db.query(
        `insert into farmerAddProducts(
        category,
        farmerName,
        productName,
        productDetails,
        productQuantity,
        address,
        pincode,
        mobileNo,
        altertiveMobileNo,
        email
        ) values (?,?,?,?,?,?,?,?,?,?)`,
        [
          category,
          farmerName,
          productName,
          productDetails,
          productQuantity,
          address,
          pincode,
          mobileNo,
          altertiveMobileNo,
          email,
        ],
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
  },

  async farmerGetproducts(req, res) {
    try {
      db.query(`select * from farmerAddProducts`, (err, result) => {
        if (err) {
          res.status(401).json({ status: false, message: err });
        } else {
          res.status(200).json({ status: true, message: result });
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async farmerAcceptsProducts(req, res) {
    try {
      const { id } = req.params;

      db.query(
        `select * from farmeraddproducts where id=?`,
        [id],
        (err, result) => {
          if (err) {
            res.status(401).json({ status: false, message: err });
          } else {
            console.log(result);
            if (result?.length == 0) {
              res
                .status(404)
                .json({ status: false, message: "Products Doesn't exist..!" });
            } else {
              const { category, productName, productQuantity } = result[0];
              if (category == "vegetables") {
                db.query(
                  `select * from vegetables where product_name=?`,
                  [productName],
                  (err, value) => {
                    if (err) {
                      res.status(401).json({ status: false, message: err });
                    } else {
                      console.log("value0--->", value);

                      if (value[0] == 0) {
                        db.query(
                          `insert into vegetables(product_name, in_stock) values(?, ?)`,
                          [productName, productQuantity],
                          (error, data) => {
                            if (err) {
                              res
                                .status(401)
                                .json({ status: false, message: error });
                            } else {
                              res
                                .status(200)
                                .json({ status: true, message: data });
                            }
                          }
                        );
                      } else {
                        const { product_name, in_stock } = value[0];

                        let update_in_stock = in_stock + productQuantity;

                        if (product_name === productName) {
                          db.query(
                            `UPDATE vegetables SET in_stock=? WHERE product_name=?`,
                            [update_in_stock, product_name],
                            (error, answer) => {
                              if (err) {
                                res
                                  .status(401)
                                  .json({ status: false, message: error });
                              } else {
                                res
                                  .status(200)
                                  .json({ status: true, message: answer });
                              }
                            }
                          );
                        } else {
                          res
                            .status(400)
                            .json({
                              status: false,
                              message: "Product name is wrong...!",
                            });
                        }
                      }
                    }
                  }
                );
              } else if (category == "seeds") {
                db.query(
                  `select * from seeds where product_name=?`,
                  [productName],
                  (err, value) => {
                    if (err) {
                      res.status(401).json({ status: false, message: err });
                    } else {
                      console.log("value", value);

                      if (value == 0) {
                        db.query(
                          `insert into seeds(product_name, in_stock) values(?, ?)`,
                          [productName, productQuantity],
                          (error, data) => {
                            if (err) {
                              res
                                .status(401)
                                .json({ status: false, message: error });
                            } else {
                              res
                                .status(200)
                                .json({ status: true, message: data });
                            }
                          }
                        );
                      } else {
                        const { product_name, in_stock } = value[0];

                        let update_in_stock = in_stock + productQuantity;

                        if (product_name === productName) {
                          db.query(
                            `UPDATE seeds SET in_stock=? WHERE product_name=?`,
                            [update_in_stock, product_name],
                            (error, answer) => {
                              if (err) {
                                res
                                  .status(401)
                                  .json({ status: false, message: error });
                              } else {
                                res
                                  .status(200)
                                  .json({ status: true, message: answer });
                              }
                            }
                          );
                        } else {
                          res
                            .status(400)
                            .json({
                              status: false,
                              message: "Product name is wrong...!",
                            });
                        }
                      }
                    }
                  }
                );
              } else {
                db.query(
                  `select * from fertilizer where product_name=?`,
                  [productName],
                  (err, value) => {
                    if (err) {
                      res.status(401).json({ status: false, message: err });
                    } else {
                      if (value == 0) {
                        db.query(
                          `insert into fertilizer(product_name, in_stock) values(?, ?)`,
                          [productName, productQuantity],
                          (error, data) => {
                            if (err) {
                              res
                                .status(401)
                                .json({ status: false, message: error });
                            } else {
                              res
                                .status(200)
                                .json({ status: true, message: data });
                            }
                          }
                        );
                      } else {
                        const { product_name, in_stock } = value[0];

                        let update_in_stock = in_stock + productQuantity;

                        if (product_name === productName) {
                          db.query(
                            `UPDATE fertilizer SET in_stock=? WHERE product_name=?`,
                            [update_in_stock, product_name],
                            (error, answer) => {
                              if (err) {
                                res
                                  .status(401)
                                  .json({ status: false, message: error });
                              } else {
                                res
                                  .status(200)
                                  .json({ status: true, message: answer });
                              }
                            }
                          );
                        } else {
                          res
                            .status(400)
                            .json({
                              status: false,
                              message: "Product name is wrong...!",
                            });
                        }
                      }
                    }
                  }
                );
              }
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async farmerRejectedProducts(req, res) {},
};

module.exports = controller;
