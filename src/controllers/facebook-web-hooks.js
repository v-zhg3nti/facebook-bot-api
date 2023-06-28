const express = require("express");
const router = express.Router();
const webHookServices = require("../services/web-hook-services");

router.get("/webhook", async (req, res) => {
  try {
    const result = await webHookServices.authorizeWebHook(req.query);
    
    if (result.status === 200) {
      res.status(result.status).send(result.challenge);
    }
  } catch (error) {
    switch (error) {
      case 403:
        res.sendStatus(403);
        break;
      case 400:
        res.sendStatus(400);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
});

router.post("/webhook", async (req, res) => {
  const { object, entry } = req.body;
  const { messaging } = entry[0];
  const userId = messaging[0].sender.id;
  console.log("object",object)
  //console.log("messaging",messaging);
  
  try {
    await webHookServices.handleWebHookFlow(object, messaging, userId);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
