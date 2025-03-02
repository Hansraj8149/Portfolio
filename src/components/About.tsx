"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
import { BsArrowRightShort } from "react-icons/bs";
import { AppWrap, MotionWrap } from "@/wrapper";

const About = () => {
  return (
    <div
      id="about"
      className="w-full h-full p-4 flex items-center py-16 content-frame"
    >
      <div className="max-w-[1240px] mx-auto md:grid grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#3c8ffc]">
            About
          </p>
          <h2 className="py-4 text-4xl font-bold">Who I Am</h2>
          <p className="py-2 text-[#3c8ffc] text-lg font-semibold">
            Hi, I&apos;m Hansraj Saini
          </p>
          <p className="py-2 text-gray-600 text-sm">
            I’ve been working on web app development for two years while still
            studying at college. Having built multiple projects using Node.js
            and React.js, I’ve gained hands-on experience. Now, I am looking for
            opportunities to gain industry experience.
          </p>
          <p className="py-2 text-gray-600">
            Some qualities that set me apart:
          </p>

          {/* Qualities List */}
          <div className="space-y-3">
            <p className="flex items-center text-gray-600 text-sm">
              <IoMdArrowDropright className="text-[#3c8ffc] mr-2" />I remain
              calm and focused, no matter how challenging the task.
            </p>
            <p className="flex items-center text-gray-600 text-sm">
              <IoMdArrowDropright className="text-[#3c8ffc] mr-2" />I am a quick
              learner and always strive for self-improvement.
            </p>
            <p className="flex items-center text-gray-600 text-sm">
              <IoMdArrowDropright className="text-[#3c8ffc] mr-2" />I am highly
              disciplined and respect time and structure.
            </p>
          </div>

          {/* Button */}
          <Link href="/#work">
            <button className="flex items-center gap-2 px-6 py-2 mt-4 text-white bg-[#3c8ffc] rounded-md hover:bg-blue-700 transition-all duration-300">
              Check out my projects <BsArrowRightShort size={22} />
            </button>
          </Link>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full h-auto mx-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 transition-all duration-300">
          <Image
            src="/images/profile2.jpg"
            width={400}
            height={400}
            className="rounded-xl"
            alt="Profile Picture"
          />
        </div>
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(About, "about"), "about");
