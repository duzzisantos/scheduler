const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartyList = new Schema({
  guestID: Number,
  firstName: String,
  lastName: String,
  email: String,
});

module.exports = mongoose.model("partylist", PartyList);
