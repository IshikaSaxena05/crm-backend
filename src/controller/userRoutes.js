const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken");
const Model = require("../database/UserSchema")
router.post("/register", async(req, res) => {
  const { email } = req.body;
  const user = new Model(req.body)
//   const userExists = await Model.findOne({ email });
//   if (userExists) {
//     res.status(400).send({
//       code: 400,
//       Status: false,
//       message: "User already exists"
//     });
//   }
    const User = user.save()
    if(User){
    res.status(200).json({
      code: 200,
      Status: true,
      message: "Registed Successfully!!"
    })
  } 
})

module.exports = router
