const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
// this file controls the signing up and logging in functionality

// this is signing up function which is exported.
exports.signup = async (req, res) => {
  // extracting name, email and password which we entered.
  const { name, email, password } = req.body;

  try {
    // checking if the user already exists or not.
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res.status(400).send("User already exists");
    }
    // if a user do not exist then creating a new user
    const user = new User({ name, email, password });
    //  saving the new user in the database
    await user.save();
    // returning a success msg
    res.status(201).send("Signup Successful");
  } catch (err) {
    // if there is some error the catch the error and return the msg
    res.status(400).send(err.message);
  }
};

// writing the login function
exports.login = async (req, res) => {
  // extracting the email and password which we entered in the login field
  const { email, password } = req.body;
  try {
    // checking whether the user exists or not
    const user = await User.findOne({ email });
    // comparing the password
    const comp = await user.comparePwd(password);
    if (!user) {
      // if user does not exist then sending an error msg
      res.status(401).send("Email not found. Signup for a new account");
    } else if (comp === false) {
      // if user didn't enter the correct password then returning the error msg
      res.status(401).send("Invalid Password");
    }
    // passing the two above error checks and extracting the token
    const token = jwt.sign(
      { id: user._id, name: user._name, email: user._email },
      process.env.JWT_SECRET
    );
    // return the token
    res.json({token});
  } catch {
    // if any error then return the server error msg
    res.status(500).send("Server Error");
  }
};
