const { Router } = require("express");
const farmController = require("../controllers/farmController");

const router = Router();

router.post("/", farmController.create);
router.get("/:id", farmController.get);
router.patch("/:id", farmController.update);
router.delete("/:id", farmController.delete);

module.exports = router;
