const router = require("express").Router();
const categoryController = require("../controller/categoryController");

router.post("/addCategory", categoryController.addCategory);
router.get("/getCategory", categoryController.getCategory);
router.get("/vegetables", categoryController.getAllVegetables);
router.get("/vegetables/:id", categoryController.getParticularVegetable);
router.get("/seeds", categoryController.getAllSeeds);
router.get("/seeds/:id", categoryController.getParticularSeed);
router.get("/fertilizer", categoryController.getAllFertilizers);
router.get("/fertilizer/:id", categoryController.getParticularFertilizer);

module.exports = router;
