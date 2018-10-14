const express = require("express");
var articlesController = require("../controllers/articleController");
const router = express.Router();
const path = require("path");

router.get("/api/v1/saves", articlesController.find);

router.post("/api/v1/saves", articlesController.create);

router.delete("/api/v1/saves/:id", articlesController.delete);

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;