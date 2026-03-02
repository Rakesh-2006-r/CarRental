import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
const Banner = () => {
  return (
    <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden">
      <div className="text-white">
        <h2 className="text-3xl font-medium">Do You Own A Luxury Car?</h2>
        <p>Rent out your car to verified customers and earn passive income.</p>
        <p>We take care of insurance, maintenance, and customer support.</p>
        <motion.button initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer">
          List your cars
        </motion.button>
      </div>
      <motion.img initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} src={assets.banner_car_image} alt="car" className="max-h-45 mt-10" />
    </motion.div>
  );
};

export default Banner;
