import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET
  );
};

// route for user log in
const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        sussess: false,
        message: "User does not exists",
      });
    }

    const isMatchPass = await bcrypt.compare(password, user.password);

    if (isMatchPass) {
      const token = createToken(user._id);
      res.json({
        success: true,
        userName: user.name,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid creadentials",
      });
    }
  } catch (error) {
    res.json({
      success: flase,
      message: error.message,
    });
  }
};

// route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        sussess: false,
        message: "user already exists",
      });
    }

    // validation email format and strong pass
    if (!validator.isEmail(email)) {
      return res.json({
        sussess: false,
        message: "Please enter a valid email",
      });
    }

    // validatin of strong pass
    if (password.length < 8) {
      return res.json({
        sussess: false,
        message: "Please enter a strong password",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPass,
    });

    const user = await newUser.save();

    // generate token so the user can log in
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: flase,
      message: error.message,
    });
  }
};

// route for admin logIN

const adminLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid creadential",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: flase,
      message: error.message,
    });
  }
};

export { logInUser, adminLogIn, registerUser };
