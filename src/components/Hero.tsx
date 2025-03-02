"use client";

import React from "react";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedinIn } from "react-icons/fa"; // Keeping these since HeroIcons lacks brand logos
import { MotionWrap } from "@/wrapper";
import { Ripple } from "./magicui/ripple";

const Hero = () => {
  return (
    <div
      id="home"
      className="w-full h-screen text-center flex items-center justify-center"
    >
      <div className="max-w-[1240px] mx-auto px-4">
        <p className="uppercase text-sm tracking-widest text-gray-300">
          LET&apos;S BUILD SOMETHING TOGETHER
        </p>
        <h1 className="py-4 text-white text-4xl font-bold">
          Hi, I&apos;m <span className="text-blue-500">Hansraj</span>
        </h1>
        <h2 className="py-2 text-white text-3xl font-semibold">
          A Fullstack Web Developer
        </h2>
        <p className="py-4 text-gray-300 sm:max-w-[70%] mx-auto">
          I’m focused on building responsive fullstack web applications while
          learning & exploring other technologies.
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-6 py-4">
          <a
            href="https://www.linkedin.com/in/hansraj-saini-634864190/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="rounded-full shadow-md shadow-gray-400 p-4 cursor-pointer hover:scale-110 transition duration-300">
              <FaLinkedinIn className="w-6 h-6 text-gray-700 hover:text-blue-500" />
            </div>
          </a>

          <a
            href="https://github.com/Hansraj8149?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            <div className="rounded-full shadow-md shadow-gray-400 p-4 cursor-pointer hover:scale-110 transition duration-300">
              <FaGithub className="w-6 h-6 text-gray-700 hover:text-gray-900" />
            </div>
          </a>

          <Link href="/#contact">
            <div className="rounded-full shadow-md shadow-gray-400 p-4 cursor-pointer hover:scale-110 transition duration-300">
              <EnvelopeIcon className="w-6 h-6 text-gray-700 hover:text-red-500" />
            </div>
          </Link>

          {/* <a href={Resume} download>
            <div className="rounded-full shadow-md shadow-gray-400 p-4 cursor-pointer hover:scale-110 transition duration-300">
              <ArrowDownTrayIcon className="w-6 h-6 text-gray-700 hover:text-green-500" />
            </div>
          </a> */}
        </div>
      </div>
      <Ripple />
    </div>
  );
};

export default MotionWrap(Hero, "home");
