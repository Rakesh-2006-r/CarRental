import express from "express";
import { protect } from "../middleware/auth.js";
import { changeRoleToOwner } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";
import { addCar } from "../controllers/ownerController.js";
import { getOwnerCars, toggleCarAvailability, deleteCar, getDashboardData, updateImage } from "../controllers/ownerController.js";
const owenerRouter = express.Router();

owenerRouter.post("/change-role", protect, changeRoleToOwner);
owenerRouter.post("/add-car", upload.single("image"),protect, addCar);
owenerRouter.get("/cars", protect, getOwnerCars);
owenerRouter.post("/toggle-car-availability", protect, toggleCarAvailability);
owenerRouter.post("/delete-car", protect, deleteCar);
owenerRouter.get("/dashboard", protect, getDashboardData);
owenerRouter.post("/update-image", upload.single("image"), protect, updateImage);
export default owenerRouter;
