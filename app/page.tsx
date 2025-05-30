"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const [showMore, setShowMore] = useState(false)

  const slideUp = () => setShowMore(true)
  const slideDown = () => setShowMore(false)

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-zinc-950 to-zinc-900">
      <motion.div
        className="absolute inset-x-0 inset-y-auto flex items-center justify-center"
        initial={{ y: 0 }}
        animate={{ y: showMore ? "-100%" : "0%" }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          duration: 0.8,
        }}
      >
        <div className="text-center space-y-8 px-6 max-w-8xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="w-72 h-96 rounded-full overflow-hidden border-2 border-accent shadow-xl">
                <Image
                  src="/sami-portrait.JPG"
                  alt="Sami Jagirdar"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-accent"
              >
                Sami <span className="text-accent">Jagirdar</span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
              >
                Welcome! I&apos;m a Software Engineer driven by the thrill of bringing bold ideas to life - crafting impactful software experiences across both digital and physical worlds, always with care and curiosity.
              </motion.p>
            </div>
          </div>

          {/* Play Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-6"
          >
            <button
              onClick={slideUp}
              className="group flex items-center gap-3 mx-auto px-6 py-2 bg-zinc-800 text-white rounded-full border-accent  hover:bg-zinc-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="font-medium">Play to learn more!</span>
              <ChevronUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* More Content Section */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950"
        initial={{ y: "100%" }}
        animate={{ y: showMore ? "0%" : "100%" }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          duration: 0.8,
        }}
      >
        <div className="text-center space-y-8 px-8 max-w-4xl">

          {/* Back Button */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: showMore ? 0 : 50,
              opacity: showMore ? 1 : 0,
            }}
            transition={{ delay: showMore ? 0.5 : 0, duration: 0.6 }}
          >
            <button
              onClick={slideDown}
              className="group flex items-center gap-3 mx-auto px-6 py-3 bg-white text-slate-800 rounded-full hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ChevronDown className="w-5 h-5 group-hover:translate-y-[2px] transition-transform duration-300" />
              <span className="font-medium">Back to intro</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
