"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Heart, Music, PlayCircle, PauseCircle } from "lucide-react";

export default function ProposalPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newAudio = new Audio("/love-song.mp3");
    setAudio(newAudio);

    const generatedHearts = [...Array(10)].map(() => ({
      id: Math.random(),
      size: Math.random() * 30 + 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setHearts(generatedHearts);

    return () => {
      newAudio.pause();
      newAudio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    if (audio) {
      if (!playing) {
        audio.play().catch((err) => console.error("Audio playback failed:", err));
      } else {
        audio.pause();
      }
      setPlaying(!playing);
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (!videoPlaying) {
        videoRef.current.play().catch((err) => console.error("Video playback failed:", err));
      } else {
        videoRef.current.pause();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const handleYesClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      router.push("/finalYes");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-pink-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Expanding Heart Animation */}
      {showHeart && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-red-500"
          initial={{ scale: 0 }}
          animate={{ scale: 20 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Heart className="text-white" size={100} />
        </motion.div>
      )}

      {/* Floating Hearts */}
      {typeof window !== "undefined" &&
        hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-red-500"
            style={{
              fontSize: `${heart.size}px`,
              left: `${heart.left}%`,
              top: `${heart.top}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 2,
              repeat: Infinity,
            }}
          >
            ❤️
          </motion.div>
        ))}

      {/* Proposal Text */}
      <motion.h1
        style={{ fontFamily: "Mansalva, cursive" }}
        className="text-4xl font-bold text-red-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Meri jaan, Will You Be Mine Forever?
      </motion.h1>

      <p className="mt-4 text-lg text-gray-800">Every moment with you is magical. Click below for a surprise!</p>

      {/* Yes Button - Triggers Heart Animation */}
      <Button
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600"
        onClick={handleYesClick}
      >
        YES!! 💖
      </Button>

      {/* Reveal Love Letter Button */}
      <Button
        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        onClick={() => setShowMessage(true)}
      >
        Reveal My Love Letter 💌
      </Button>

      {/* Love Letter */}
      {showMessage && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Card className="mt-6 p-6 bg-white shadow-xl w-96 text-gray-800 relative">
            <CardContent>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-lg font-bold text-gray-800 bg-gray-100 p-2 rounded-lg shadow-md"
              >
                From the moment I met you, I knew my heart belonged to you. 💕 You are the piece of my soul that I never thought was missing.
                <br />
                I will be yours! Will you be mine?!
              </motion.p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.3, yoyo: 3 }}
                className="mt-4"
              >
                <Heart className="text-red-500 mx-auto" size={40} />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Play Video Button */}
      <Button
        className="mt-6 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600"
        onClick={() => setShowVideo(true)}
      >
        Watch A Cute Surprise 🎥
      </Button>

      {/* Video Player */}
      {showVideo && (
        <div className="mt-6">
          <video ref={videoRef} src="/cute-video.mp4" className="w-80 rounded-lg shadow-lg" muted playsInline />
          <Button
            onClick={toggleVideo}
            className="mt-4 flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {videoPlaying ? <PauseCircle /> : <PlayCircle />}
            <span>{videoPlaying ? "Pause Video" : "Play Video"}</span>
          </Button>
        </div>
      )}

      {/* Play Music Button */}
      <Button
        onClick={toggleMusic}
        className="mt-6 flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        {playing ? <Pause /> : <Play />} <Music className="ml-2" />
      </Button>
    </div>
  );
}
