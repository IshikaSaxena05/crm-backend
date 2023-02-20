require("dotenv").config();
const { userModel } = require("../database/UserSchema");
const ErrorController = require("../middlewares/ErrorController");
// const {
//   sendOTPverificationEmail,
// } = require("../Controllers/Middlewares/UserRegisterationEmailOTP");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const jwt = require("jsonwebtoken");

var createDOC = async (data) => {
  try {
    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    // Object.assign(data,{password: hashPassword})      // Replace password value in data

    const userDOC = new userModel(data);
    // here jwt token can create middleware
    const result = await userDOC.save();
    return {
      status: true,
      statuscode: 200,
      messages: ["Please check Email for OTP"],
      userId: result._id,
    };
  } catch (error) {
    //   console.log(error);
    return ErrorController(error);
  }
};

const UserRegisteration = async (req, res) => {
  try {
    const result = await createDOC(req.body);
    // middleware for sending otp in email
    // await sendOTPverificationEmail(result.userId);
    if(result.statuscode === 200)
    res.status(200).send(result);
    else if(result.statuscode === 409)
    res.status(409).send(result);
    else
    res.status(400).send(result);
  } catch (err) {
    res.status(500).send({
      status: false,
      messages: ["Server Internal Error"],
      Error: err,
    });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    var result = await userModel.findOne({ email: email });
    if (result !== null) {
      const isMatch = await bcrypt.compare(password, result.password);
      if (result.email === email && isMatch) {
        const authToken = jwt.sign(
          { userId: result._id },
          process.env.SECRET_KEY,
          { expiresIn: 60 }
        );
        res.status(200).send({
          status: true,
          authToken,
          messages: ["Login Successfully !"],
        });
      } else {
        res.status(400).send({ status: false, messages: ["Invalid Cerdential"] });
      }
    } else {
      res.status(400).send({ status: 400, messages: ["You are not a Registered User"] });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      Errors: error,
      messages: ["An unknown error occurred."],
    });
  }
};

module.exports = { UserRegisteration, UserLogin };
