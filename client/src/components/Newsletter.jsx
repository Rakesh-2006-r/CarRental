import React from "react";
import { motion } from "motion/react";
const Newsletter = () => {
  return (
    <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40">
      <motion.h1 initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</motion.h1>
      <motion.p initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </motion.p>
      <motion.form initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <motion.input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <motion.button initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary/80 transition-all cursor-pointer rounded-md rounded-l-none">
          Subscribe
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Newsletter;
