import express from "express";
import { register } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";

const router = express.Router();

router.get("/register").post(register);
router.get("/login").post(login);


export default router;