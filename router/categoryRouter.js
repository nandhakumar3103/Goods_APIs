const router = require("express").Router();
const categoryController = require("../controller/categoryController");

router.post("/addCategory", categoryController.addCategory);
router.get("/getCategory", categoryController.getCategory);

module.exports = router;
