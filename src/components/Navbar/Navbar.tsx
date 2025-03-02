"use client";
import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className="fixed py-4 top-0 left-0 w-full z-50 transition-all duration-300 
      "
    >
      <div className=" content-frame flex justify-between items-center px-2">
        <div className="flex items-center">
          <h1 className="font-mulish text-2xl font-bold text-blue-500">H</h1>
          <h1 className="font-mulish text-2xl font-bold text-white">S</h1>
        </div>

        <ul className="hidden md:flex space-x-1 lg:space-x-2">
          {["home", "work", "about", "skills", "contact"].map((item) => (
            <li key={item} className="group px-3 py-2">
              <a
                href={`#${item}`}
                className="font-mulish px-1 text-white text-[0.9rem] font-bold capitalize rounded-lg transition-colors duration-300 relative inline-block overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-600">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://drive.google.com/file/d/10UKpYmp3qFza8onnqYzt2ZrD6OqIKuxg/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-md hover:shadow-blue-200 transform hover:-translate-y-0.5">
            Resume
          </button>
        </a>

        <button
          className="md:hidden p-2 rounded-full bg-blue-50 transition-colors duration-300 hover:bg-blue-100"
          onClick={() => setToggle(true)}
        >
          <HiMenuAlt4 className="text-2xl text-blue-500" />
        </button>

        {toggle && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setToggle(false)}
          ></div>
        )}

        {toggle && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 w-80 h-full  shadow-lg p-8 flex flex-col items-start justify-center z-50 md:hidden"
          >
            <button
              onClick={() => setToggle(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
            >
              <HiX className="text-xl text-blue-500" />
            </button>

            <ul className="space-y-4 w-full">
              {["home", "work", "about", "skills", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={() => setToggle(false)}
                    className="font-mulish  py-3 px-4 text-white text-[0.9rem] font-bold capitalize rounded-lg transition-colors duration-300 hover:bg-blue-50 hover:text-blue-600 flex flex-col no-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="https://drive.google.com/file/d/10UKpYmp3qFza8onnqYzt2ZrD6OqIKuxg/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full"
            >
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-md">
                Resume
              </button>
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
