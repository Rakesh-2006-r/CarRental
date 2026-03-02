import User from "../models/User.js";
import Car from "../models/Car.js";
import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Booking from "../models/Booking.js";

// Api to change role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to List Car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });
    var optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });
    const image = optimizedImageURL;
    await Car.create({ ...car, owner: _id, image });
    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to List Owner Cars

export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Toggle Car Availability

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    //checking if the car is owned by the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "You are not the owner of this car",
      });
    }
    car.isAvailable = !car.isAvailable;
    await car.save();
    res.json({
      success: true,
      message: "Car availability toggled successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Delete Car

export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    //checking if the car is owned by the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "You are not the owner of this car",
      });
    }
    car.owner = null;
    car.isAvailable = false;
    await car.save();
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get Dashboard Data

export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;
    if (role !== "owner") {
      return res.json({
        success: false,
        message: "You are not the owner of this car",
      });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    const pendingBookings = bookings.filter((b) => b.status === "pending");
    const completedBookings = bookings.filter((b) => b.status === "confirmed");
    const monthlyRevenue = completedBookings.reduce(
      (total, booking) => total + booking.totalPrice,
      0,
    );

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to update user image

export const updateImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });
    var optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });
    const image = optimizedImageURL;
    const user = await User.findById(_id);
    user.image = image;
    await user.save();
    res.json({ success: true, message: "Image updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
