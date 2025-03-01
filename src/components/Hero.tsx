"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [color, setColor] = useState("#7a5af5");

  return (
    <section className="relative flex items-center justify-center h-screen bg-gray-100">
      {/* Left Section */}
      <div className="absolute left-0 w-1/2 h-full bg-black flex items-center justify-center">
        <motion.div
          className="relative w-80 h-96 bg-gray-900 p-2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute inset-0 clip-triangle"
            style={{ backgroundColor: color }}
          ></div>
          <Image
            src="/profile.jpg"
            alt="Developer"
            layout="fill"
            className="object-cover z-10"
          />
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 p-10 text-gray-900">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          I&apos;m a <span className="text-black">Web Developer</span>
        </motion.h1>
        <p className="mt-4 text-gray-600">
          100% HTML5 & Bootstrap5 Templates Made By Growtech.
        </p>
        <div className="mt-6 flex space-x-4">
          <Button variant="outline">Get Started</Button>
          <Button style={{ backgroundColor: color }}>View Portfolio</Button>
        </div>
      </div>

      {/* Color Picker */}
      <div className="absolute top-10 right-10 bg-white p-4 shadow-lg rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Choose a Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {["#7a5af5", "#e63946", "#f4a261", "#2a9d8f"].map((c) => (
            <button
              key={c}
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
