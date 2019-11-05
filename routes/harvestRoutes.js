const { Router } = require("express");
const harvestController = require("../controllers/harvestController");

const router = Router();

router.post("/", harvestController.create);
router.get("/:id", harvestController.get);
router.patch("/:id", harvestController.update);
router.delete("/:id", harvestController.delete);

module.exports = router;
