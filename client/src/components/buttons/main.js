import React from 'react'
import {motion} from "framer-motion"
export default function Button({text}) {
  return (
    <motion.button
    whileHover={{ scale: 1.01}}
    whileTap={{ scale: 0.95}}
    className="relative py-1 px-6 bg-[#EF233C] text-white font-bold rounded-lg   shadow-lg transition-transform duration-300 ease-in-out "
  
  >
    <div className="absolute inset-0 bg-crack-pattern bg-no-repeat bg-cover opacity-40" />
    {text}
  </motion.button>  )
}
