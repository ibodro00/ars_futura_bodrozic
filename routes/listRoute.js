const express = require("express");
const listController = require("../controllers/listController");

const router = express.Router();

router.get("/:id", listController.list_get);
router.post("/:id", listController.list_post);
router.delete("/:id/:item", listController.list_delete);
router.put("/:id/:item", listController.list_put);

module.exports = router;
