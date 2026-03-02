import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
const CarDetails = () => {
  const { id } = useParams();
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } =
    useAppContext();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      return toast.error("Please select a valid pickup and return date");
    }
    try {
      const { data } = await axios.post(`/api/bookings/create`, {
        car: id,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);
  return car ? (
    <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
        type="button"
      >
        <motion.img
          initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} src={assets.arrow_icon}
          alt="arrow"
          className="rotate-180 opacity-65"
        />
        Back To All Cars
      </motion.button>
      <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/*Left: Car Image & Details*/}
        <motion.div className="lg:col-span-2">
          <motion.img
            initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} src={car.image}
            alt={car.name}
            className="w-full h-96 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} . {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: `${car.fuel_type}` },
                { icon: assets.car_icon, text: `${car.transmission}` },
                { icon: assets.location_icon, text: `${car.location}` },
              ].map(({ icon, text }, index) => (
                <motion.div
                  initial = {{y: 40, opacity: 0}} animate={{y: 0, opacity: 1}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} key={index}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="icon" className="h-5 mb-2" />
                  {text}
                </motion.div>
              ))}
            </div>
            {/*Description*/}
            <div>
              <h1 className="text-xl font-medium mb-4">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
            {/*features*/}
            <div>
              <h1 className="text-xl font-medium mb-4">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} className="h-4 mr-2" alt="" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        {/*Right: Booking Form*/}
        <motion.form
          onSubmit={handleBooking}
          initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <h2 className="text-2xl font-semibold">Book this car</h2>
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            Rs.{car.price_per_day}{" "}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>
          <hr className="border-borderColor my-6" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              id="pickup-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
          <motion.button
            type="submit"
            initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dull transition-colors cursor-pointer"
          >
            Book Now
          </motion.button>
          <motion.p initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="text-center text-sm text-gray-500">
            You can cancel your booking anytime
          </motion.p>
        </motion.form>
      </motion.div>
    </motion.div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
