"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export default function KittenPage() {
  const router = useRouter();
  const [trickCount, setTrickCount] = useState(0);
  const [okaySize, setOkaySize] = useState(1);
  const [buttonPosition, setButtonPosition] = useState({ top: "50%", left: "50%" });

  const kittenImages = [
    "/kittens/kitten1.png",
    "/kittens/kitten2.png",
    "/kittens/kitten3.png",
    "/kittens/kitten4.png",
    "/kittens/kitten5.png",
    "/kittens/kitten6.png",
  ];

  const trickMessages = [
    "Yeah that's right, click that okay pwease... 😿",
    "Oh no, it's starting to get angyy! 😭",
    "AHH!! Not the right choice You MONSTER! ! 😱",
    "still no?! 😨 are you fr bro?",
    "Click okay before it cries... 💔",
    "it's dead now happy? now start over... 🤨"
  ];

  const moveButton = () => {
    setButtonPosition({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    });

    if (trickCount < kittenImages.length - 1) {
      setTrickCount(trickCount + 1);
      setOkaySize(okaySize + 0.2); // Make the "Okay" button grow
    } else {
      setTrickCount(0); // Reset after 6 clicks
      setOkaySize(1); // Reset button size
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-pink-200 text-center">
      {/* Surprise Message */}
      <p className="text-lg font-semibold text-gray-800 mb-4">Click okay for a surprise!</p>

      {/* Kitten Image */}
      <motion.img
        src={kittenImages[trickCount]}
        alt="Sad Kitten"
        className="w-64 h-64 rounded-lg shadow-lg"
        key={trickCount} // Forces re-render on each image change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Funny Messages */}
      <p className="mt-4 text-lg font-semibold text-gray-800">{trickMessages[trickCount]}</p>

      {/* Buttons */}
      <div className="relative w-full flex justify-center mt-6">
        {/* "Okay" Button - Grows Bigger */}
        <Button
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          style={{ transform: `scale(${okaySize})` }}
          onClick={() => router.push("/proposal")}
        >
          Okay! ❤️
        </Button>

        {/* "Not Interested" Button - Moves Erratically */}
        <motion.button
          className="absolute bg-red-500 text-white px-4 py-2 rounded-lg"
          style={{ top: buttonPosition.top, left: buttonPosition.left, position: "absolute" }}
          whileHover={{ scale: 1.1 }}
          onClick={moveButton}
        >
          Not Interested 🚫
        </motion.button>
      </div>
    </div>
  );
}
