const Guest = require("./model/model");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
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


  //Email and password needed for outgoing mail authentication
  const partyHostEmail = "";
  const partyHostPassword = "gkqbzzfstmbkiarf";

  const transporter = nodemailer.createTransport({
    auth: {
      user: partyHostEmail,
      pass: partyHostPassword,
    },
    authMethod: "PLAIN",
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
  });

  //This contains the email body

  const htmlContent = `<h2>${guest.firstName}, we look forward to seeing you!</h2>
  <h4>Here are the details: </h4> <p>Invitation ID: ${guest.guestID}</p>
  <p>Name: ${guest.firstName} ${guest.lastName}</p> <p>Party address: 999 Okeke BLVD, Towson, MD.</p> 
  <p>Date: 12.12.2022, Time: 19:00</P
  <p><img src="https://cdn.dribbble.com/users/2055971/screenshots/13101945/media/37e61baee74c5c06d8747214a38d4ac3.jpg?compress=1&resize=400x300&vertical=top" alt="IV-banner"></p>
  <div id="container"></div>`;

  const plainText =
    "We look forward to seeing you! Here are the details:  Invitation ID:  . Name:  .";

  const mailOptions = {
    from: "Duzie " + partyHostEmail,
    to: guest.email,
    subject: "Thanks for signing up for Felix's party!",
    text: plainText,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
  //This saves the file we have created
  guest
    .save(guest)
    .then((data) => {
      console.log(data);
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
        console.log(data);
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
        message: "Deleted everything!",
        data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
