import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Function to Check Availability of Car for a given date range
const checkAvailability = async (carId, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car: carId,
    status: { $ne: "cancelled" }, // Ignore cancelled bookings
    pickupDate: { $lte: new Date(returnDate) },
    returnDate: { $gte: new Date(pickupDate) },
  });
  return bookings.length === 0;
};

// api TO CHECK AVAILABILITY
export const checkAvailabilityofCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // fetch cars based on location
    const cars = await Car.find({ location, isAvailable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate,
      );
      return { ...car.toObject(), isAvailable };
    });

    const carsWithAvailability = await Promise.all(availableCarsPromises);
    const availableCars = carsWithAvailability.filter((car) => car.isAvailable);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log("checkAvailabilityofCar error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Create Booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    // Verify car exists
    const carData = await Car.findById(car);
    if (!carData) {
      return res.json({ success: false, message: "Car not found" });
    }

    // Check availability
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Car is not available for the selected date range",
      });
    }

    // Calculate total price
    const pickupDateObj = new Date(pickupDate);
    const returnDateObj = new Date(returnDate);
    const diffTime = Math.abs(returnDateObj - pickupDateObj);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Ensure at least 1 day charge if dates are same or very close, or handle as per business logic
    // Assuming user books for at least 1 day.
    const effectiveDays = days === 0 ? 1 : days;

    const totalPrice = carData.price_per_day * effectiveDays;

    const booking = await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate: pickupDateObj,
      returnDate: returnDateObj,
      totalPrice,
    });

    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.log("createBooking error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to List User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to List Owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({
        success: false,
        message: "You are not the owner of this car",
      });
    }
    const { _id } = req.user;
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .populate({ path: "user", select: "-password" })
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Update Booking Status
export const updateBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "You are not authorized to update this booking",
      });
    }

    booking.status = status;
    await booking.save();
    res.json({ success: true, message: "Booking status updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
