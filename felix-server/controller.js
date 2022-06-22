const Guest = require("./model/model")

//Create a file

exports.create = (req, res) => {
  if (!req.body.ID) {
    res.status(500).json({ message: "Body cannot be empty!" });
  }

  const guest = new Guest({
    guestID: req.body.guestID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  //This saves the file we have created
  guest
    .save(guest)
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err);
    });
};

//Read all files created

exports.findAll = (req, res) => {
  const guestID = req.body.id;
  var regexCondition = guestID
    ? { guestID: { $regex: new RegExp(guestID), $options: "i" } }
    : {};
  Guest.find(regexCondition)
    .then((data) => {
      console.log(res.json(data));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Read one

exports.findOne = (req, res) => {
  const guestID = req.params.id;
  Guest.findById(guestID)
    .then((data) => {
      if (!data) {
        console.log("Error, not found!");
      } else {
        console.log(res.json(data));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Update one

exports.update = (req, res) => {
  Guest.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, data, next) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log("Updated successfully!");
      }
    }
  );
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Guest.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        console.log("Error, not found!");
      } else {
        console.log("Deleted successfully!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Delete everything

exports.deleteAll = (req, res) => {
  Guest.deleteMany({})
    .then((data) => {
      res.send({
        message: "Deleted everything!", data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
