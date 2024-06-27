import User from "./../models/user.model.js";
import bcrypt from "bcrypt";

// Register a new user
export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

// Log in to the user
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(404).send("There is not any user with the given info");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) res.status(400).send("Wrong password or username");

    const { password, ...info } = user._doc;

    res.status(200).send(info);
  } catch (error) {
    res.status(500).send("Something went wrong");
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
