module.exports = (app) => {
  const partyguest = require("./controller");
  var router = require("express").Router();

  router.post("/", partyguest.create);
  router.get("/", partyguest.findAll);
  router.get("/:id", partyguest.findOne);
  router.put("/:id", partyguest.update);
  router.delete("/:id", partyguest.deleteOne);
  router.delete("/", partyguest.deleteAll);
  app.use("/api/felix-einladung", router);
};
