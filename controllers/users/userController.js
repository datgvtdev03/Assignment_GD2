const UserModel = require('../../models/UserModels');
const bcrypt = require('bcrypt');
const multer = require("multer");
const fs = require("fs");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //neu chua co folder thi tao ra folder
    var dir = "./uploads";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    let fileName = file.originalname;
    arr = fileName.split(".");

    let newFileName = "";

    for (let i = 0; i < arr.length; i++) {
      if (i != arr.length - 1) {
        newFileName += arr[i];
      } else {
        newFileName += "-" + Date.now() + "." + arr[i];
      }
    }
    cb(null, newFileName);
  },
});
var upload = multer({ storage: storage });


const userController = {

  


  //dang ki 
  registerUser: async(req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      //ma hoa mat khau
      const hased = await bcrypt.hash(req.body.password, salt)

      //create user 
      const newUser = await new UserModel({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hased,
      })
      //save new user
      const user = await newUser.save()
      res.status(200).json(user)

    } catch (err) {
      res.status(500).json(err);
    }

  }
}
module.exports = userController;