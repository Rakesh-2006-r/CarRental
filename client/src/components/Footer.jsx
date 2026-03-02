import React from 'react'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
const Footer = () => {
  return (
   <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className='px-6 md:px-16 lg:px-24 xl:px-32 mt-52 text-sm text-gray-500'>
            <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>
                <motion.div className='max-w-80'>
                    <motion.img initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} src={assets.logo} alt="logo" className='mb-4 h-8 md:h-9' />
                    <motion.p initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className='max-w-80 mt-3'>
                        Rakesh Car Rentals is an online platform that allows users to easily search, compare, and book cars for their travel needs. Our goal is to provide safe, affordable, and convenient transportation services.
                    </motion.p>
                    <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className='flex items-center gap-3 mt-6'>
                        <a href="#"><img src={assets.instagram_logo} className='w-6 h-6' alt="instagram" /></a>
                        <a href="#"><img src={assets.facebook_logo} className='w-6 h-6' alt="facebook" /></a>
                        <a href="#"><img src={assets.twitter_logo} className='w-6 h-6' alt="twitter" /></a>
                        <a href="#"><img src={assets.gmail_logo} className='w-6 h-6' alt="gmail" /></a>
                    </motion.div>
                </motion.div>
                <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}}>
                    <motion.p initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className='text-base font-medium text-gray-800 uppercase'>Quick Links</motion.p>
                    <ul className='mt-3 flex flex-col gap-2'>
                        <li><motion.a href="#">Home</motion.a></li>
                        <li><motion.a href="#">Browse Cars</motion.a></li>
                        <li><motion.a href="#">List Your Car</motion.a></li>
                        <li><motion.a href="#">About Us</motion.a></li>
                        
                    </ul>
                </motion.div>
                <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}}>
                    <motion.p initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className='text-base font-medium text-gray-800 uppercase'>Resources</motion.p>
                    <ul className='mt-3 flex flex-col gap-2'>
                        <li><motion.a href="#">Help Center</motion.a></li>
                        <li><motion.a href="#">Terms of Services</motion.a></li>
                        <li><motion.a href="#">Privacy Policy</motion.a></li>
                        <li><motion.a href="#">Insurance</motion.a></li>
                        
                    </ul>
                </motion.div>
                <motion.div initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}}>
                    <motion.p initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className='text-base font-medium text-gray-800 uppercase'>Contact</motion.p>
                    <ul className='mt-3 flex flex-col gap-2'>
                        <li>Rakesh Lurury Drive</li>
                        <li>Hyderabad, Telangana</li>
                        <li>9876543210</li>
                        <li>carrental@gmail.com</li>    
                    </ul>
                </motion.div>

                

               
            </motion.div>
            
            <motion.div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <motion.p initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} >© {new Date().getFullYear()} Rakesh Car Rentals. All rights reserved.</motion.p>
                <motion.ul initial = {{y: 40, opacity: 0}} whileInView={{y: 0, opacity: 1}} viewport={{amount: 0.1, once: true}} transition={{duration: 0.8 , ease: "easeInOut"}} className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>
                    <li><a href="#">Cookies</a></li>
                </motion.ul>
            </motion.div>
        </motion.div>
  )
}

export default Footer