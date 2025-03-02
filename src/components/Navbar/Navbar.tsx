"use client";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { motion } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-25 backdrop-blur-sm border border-white/20 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={144}
          height={64}
          className="w-36 h-16 cursor-pointer"
        />
      </div>

      <ul className="hidden md:flex space-x-6">
        {["home", "work", "about", "skills", "contact"].map((item) => (
          <li key={item} className="text-gray-700 font-semibold capitalize">
            <a href={`#${item}`} className="hover:text-blue-500 transition">
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <a
          href="https://drive.google.com/file/d/10UKpYmp3qFza8onnqYzt2ZrD6OqIKuxg/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md transition hover:bg-blue-700">
            Resume
          </button>
        </a>
      </div>

      <div className="md:hidden">
        <Bars3Icon
          className="text-2xl cursor-pointer"
          onClick={() => setToggle(true)}
        />

        {toggle && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg p-6 flex flex-col items-end"
          >
            <XMarkIcon
              className="text-3xl cursor-pointer mb-6"
              onClick={() => setToggle(false)}
            />

            <ul className="space-y-4">
              {["home", "about", "work", "skills", "contact"].map((item) => (
                <li
                  key={item}
                  className="text-gray-800 text-lg font-medium capitalize"
                >
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
