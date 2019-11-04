const { Router } = require("express");
const millController = require("../controllers/millControllers");

const router = Router();

router.post("/", millController.create);
router.get("/", millController.list);
router.patch("/:id", millController.update);
router.delete("/:id", millController.delete);

module.exports = router;
