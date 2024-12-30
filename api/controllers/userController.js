import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { deleteMedia } from "../utils/cloudinary.js";
import { uploadMedia } from "../utils/cloudinary.js";

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
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: `Welcome Back ${user.name}`, success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to Login", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to Logout", success: false });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to get user profile", success: false });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (user.profileUrl) {
      const publicId = user.profileUrl.split("/").pop().split(".")[0];
      deleteMedia(publicId);
    }

    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res
      .status(200)
      .json({ message: "User profile updated", success: true, updatedUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to update user profile", success: false });
  }
};
