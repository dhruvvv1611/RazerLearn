import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to Register", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: `Welcome Back ${user.name}`, success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Login", success: false });
  }
};
