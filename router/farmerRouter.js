const router = require("express").Router();
const farmerController = require("../controller/farmerController");

router.post("/addProducts", farmerController.farmerAddProducts);
router.get("/productList", farmerController.farmerGetproducts);
router.post("/acceptproduct/:id", farmerController.farmerAcceptsProducts);

module.exports = router;
