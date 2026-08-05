const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    console.log("data body se nikal liye hai")
    // console.log(`firstName = ${firstName}, lastName = ${lastName},email = ${email},password = ${password},confirmPassword = ${confirmPassword}`);
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      console.log("yahan validation ho rha hai")
      return res.status(403).json({
        success: false,
        message: "Please fill all required filled",
      });
    }
    console.log("comparision password between password or confirm-password")
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password not matched",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Registered Please Login First",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    return res.status(200).json({
      succes: true,
      message: "User signedUp Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: false,
      message: "User Cannot Be Registered, Please Try Again",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill the required Area",
      });
    }

    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registed, please signup first",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
      );
      user.token = token;
      user.password = undefined;
      user.confirmPassword = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Login Successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is Incorrect",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Login Failure Please Try Again",
    });
  }
};
module.exports = { signup, login };
