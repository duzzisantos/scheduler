const dbConfiguration = require("../config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfiguration.url;
db.model = require("./model")
module.exports = db;
