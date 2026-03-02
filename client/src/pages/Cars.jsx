import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
const Cars = () => {
  // getting search params from url
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const isSearchData = location && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = async () => {
    if (input === "") {
      setFilteredCars(cars);
      return null;
    }
    const lowerInput = input.toLowerCase();
    const filtered = cars.filter((car) => {
      return (
        (car.brand && car.brand.toLowerCase().includes(lowerInput)) ||
        (car.model && car.model.toLowerCase().includes(lowerInput)) ||
        (car.category && car.category.toLowerCase().includes(lowerInput)) ||
        (car.year && String(car.year).includes(lowerInput)) ||
        (car.location && car.location.toLowerCase().includes(lowerInput)) ||
        (car.price_per_day && String(car.price_per_day).includes(lowerInput)) ||
        (car.seating_capacity &&
          String(car.seating_capacity).includes(lowerInput)) ||
        (car.fuel_type && car.fuel_type.toLowerCase().includes(lowerInput)) ||
        (car.transmission &&
          car.transmission.toLowerCase().includes(lowerInput))
      );
    });

    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post(`/api/bookings/check-availability`, {
        location,
        pickupDate,
        returnDate,
      });
      data.success
        ? setFilteredCars(data.availableCars)
        : toast.error(data.message);
      if (data.availableCars && data.availableCars.length === 0) {
        toast.error("No cars available for the selected dates");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    }
  }, [isSearchData]);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input]);

  return (
    <div>
      <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our collection of available premium and luxury cars for rent"
        />
        <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <motion.img initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model or features"
            className="w-full h-full bg-transparent outline-none text-gray-500"
          />
          <motion.img initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </motion.div>
      </motion.div>
      <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <motion.p initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </motion.p>
        <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <motion.div key={index}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Cars;
