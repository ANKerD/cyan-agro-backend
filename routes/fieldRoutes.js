const { Router } = require("express");
const fieldController = require("../controllers/fieldController");

const router = Router();

router.post("/", fieldController.create);
router.patch("/:id", fieldController.update);
router.delete("/:id", fieldController.delete);

module.exports = router;
