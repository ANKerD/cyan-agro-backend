const { Router } = require("express");
const millController = require("../controllers/millController");

const router = Router();

router.post("/", millController.create);
router.get("/", millController.list);
router.get("/:id", millController.get);
router.patch("/:id", millController.update);
router.delete("/:id", millController.delete);

module.exports = router;
