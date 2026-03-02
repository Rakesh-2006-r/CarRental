import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
  getAllCars,
  changeRole,
  forgotPassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", getAllCars);
userRouter.post("/change-role", protect, changeRole);
export default userRouter;
