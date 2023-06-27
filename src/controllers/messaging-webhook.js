const express = require("express");
const router = express.Router();

router.post("/messaging-reactions", (req, res, next) => {
  console.log(req.query, "@@@@@messaging-webhook");
  next();
});

module.exports = router;
