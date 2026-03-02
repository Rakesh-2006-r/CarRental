import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
const Testimonial = () => {
  const testimonials = [
    {
      name: "Lakshmi",
      location: "Bangalore, Hyderabad",
      image: assets.testimonial_image_1,
      rating: 5,
      review:
        "I've used many car rental services, but this one is by far the best. The cars are clean, the prices are reasonable, and the customer service is excellent.",
    },
    {
      name: "Tara",
      location: "Mumbai, Maharashtra",
      image: assets.testimonial_image_2,
      rating: 4,
      review:
        "This is a great service! The cars are well-maintained and the staff is very friendly.",
    },
    {
      name: "Sita",
      location: "Delhi, Gurugram",
      image: assets.testimonial_image_1,
      rating: 5,
      review:
        "The booking process was seamless and the car was delivered right to my doorstep. Highly recommended!",
    },
  ];
  return (
    <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="TDiscover why discerning travelers choose us for their car rental needs."
      />

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    src={assets.star_icon}
                    alt="star"
                    className="w-4 h-4"
                  />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.review}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Testimonial;
