import React from "react";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
const FeatureSection = () => {
  const navigate = useNavigate();
  const { cars, axios } = useAppContext();
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ amount: 0.1, once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ amount: 0.1, once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for rent"
        />
      </motion.div>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ amount: 0.1, once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {cars.slice(0, 6).map((car) => (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.1, once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            key={car._id}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>
      <motion.button
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ amount: 0.1, once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        Explore All Cars <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </motion.div>
  );
};

export default FeatureSection;
