"use client";
import { motion } from "framer-motion";

export default function FinalYes() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-center p-6">
      <motion.img
        src="/romantic-couple.png"
        alt="Romantic Couple"
        className="w-64 h-64 rounded-lg shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
      />

      <motion.h1
        className="text-5xl font-bold text-red-600 mt-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        You Said YES!! 💖
      </motion.h1>

      <p className="mt-4 text-lg text-gray-800">
        Now and forever, you are my everything! Let's make beautiful memories together. 💑💕
      </p>
    </div>
  );
}
