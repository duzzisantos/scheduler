const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./model");
//mongoose connection
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:4000/",
};

//utilities

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./route")(app);

//connection credentials

const PORT = 4000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log("LISTENING TO PORT", PORT);
  } else {
    console.log(err);
  }
});
