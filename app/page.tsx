"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import {PhaserGameRef} from "@/app/game/PhaserGame"
import dynamic from 'next/dynamic';

export default function Home() {
  const [showMore, setShowMore] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const slideUp = () => setShowMore(true)
  const slideDown = () => setShowMore(false)

  const startGame = () => {
    setGameStarted(true)
  }

  const phaserRef = useRef<PhaserGameRef | null>(null);

  const PhaserGame = dynamic(
    () => import('@/app/game/PhaserGame').then(mod => ({ default: mod.PhaserGame })),
    { 
      ssr: false,
      loading: () => (
        <div className="flex items-center justify-center w-96 h-96 bg-zinc-800 rounded-lg">
          <div className="text-white">Loading game...</div>
        </div>
      )
    }
  );

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
        <div className="text-center mt-16 space-y-8 px-6 max-w-8xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="w-72 h-96 rounded-full overflow-hidden border-2 border-accent shadow-xl">
                <Image
                  src="/sami-portrait2.JPG"
                  alt="Sami Jagirdar"
                  width={320}
                  height={160}
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
                className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
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
              className="group flex items-center gap-3 mx-auto px-6 py-2 bg-zinc-800 text-white rounded-full border-accent hover:bg-zinc-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="font-medium">Play to learn more!</span>
              <ChevronUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Game Section */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 overflow-y-auto"
        initial={{ y: "100%" }}
        animate={{ y: showMore ? "0%" : "100%" }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          duration: 0.8,
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen py-8 space-y-8">
          
          {/* Game Instructions */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: showMore ? 0 : 50,
              opacity: showMore ? 1 : 0,
            }}
            transition={{ delay: showMore ? 0.3 : 0, duration: 0.6 }}
            className="text-center space-y-4 px-6 max-w-2xl"
          >
            <h2 className="text-3xl font-bold text-accent italic">Sami&apos;s Space</h2>
            <p className="text-gray-300 text-lg">
              Use arrow keys to explore my space and discover more about my projects and experience!
            </p>
          </motion.div>

          {/* Game Container */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: showMore ? 0 : 50,
              opacity: showMore ? 1 : 0,
            }}
            transition={{ delay: showMore ? 0.4 : 0, duration: 0.6 }}
            className="relative"
          >
            <div className="w-96 h-96 bg-zinc-900 rounded-lg border-2 border-zinc-700 shadow-2xl overflow-hidden">
              {!gameStarted ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                 
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors font-medium"
                  >
                    Start Game
                  </button>
                </div>
              ) : (
                <div id="game-container" className="w-full h-full">
                  <PhaserGame ref={phaserRef} />
                </div>
              )}
            </div>
          </motion.div>

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