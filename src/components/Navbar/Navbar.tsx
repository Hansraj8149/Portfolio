"use client";
import React, { useEffect, useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [resume, setResume] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const resumeData = await client.fetch('*[_type == "resume"]');
      setResume(resumeData[0]?.pdf || null);
    };

    fetchData();
  }, []);

  return (
    <nav className="fixed py-4 top-0 left-0 w-full z-50 transition-all duration-300 bg-background dark:bg-background-dark">
      <div className="content-frame flex justify-between items-center px-2">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="font-mulish text-2xl font-bold text-primary dark:text-primary-light">
            H
          </h1>
          <h1 className="font-mulish text-2xl font-bold text-text dark:text-text-dark">
            S
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-1 lg:space-x-2">
          {["home", "work", "about", "skills", "contact"].map((item) => (
            <li key={item} className="group px-3 py-2">
              <a
                href={`#${item}`}
                className="font-mulish px-1 text-text dark:text-text-dark text-[0.9rem] font-bold capitalize rounded-lg transition-colors duration-300 relative inline-block overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-dark dark:group-hover:text-secondary-light">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Resume & Theme Toggle */}
        <div className="flex items-center space-x-4">
          <a
            href={resume || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <button className="bg-primary dark:bg-primary-dark text-text dark:text-text-dark px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-darker dark:hover:bg-primary-light transform">
              Resume
            </button>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-primary-light dark:bg-primary-darker transition-colors duration-300 hover:bg-primary-dark dark:hover:bg-primary-light"
          >
            {theme === "dark" ? (
              <MdLightMode className="text-2xl text-primary dark:text-secondary-light" />
            ) : (
              <MdDarkMode className="text-2xl text-primary dark:text-secondary-light" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 rounded-full bg-primary-light dark:bg-primary-darker transition-colors duration-300 hover:bg-primary-dark dark:hover:bg-primary-light"
            onClick={() => setToggle(true)}
          >
            <HiMenuAlt4 className="text-2xl text-primary dark:text-secondary-light" />
          </button>
        </div>

        {/* Mobile Overlay */}
        {toggle && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setToggle(false)}
          ></div>
        )}

        {/* Mobile Navigation Drawer */}
        {toggle && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full max-w-[80%] w-[320px] shadow-xl p-6 flex flex-col items-center justify-start z-50 bg-background dark:bg-background-dark md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setToggle(false)}
              className="absolute top-5 right-5 p-2 md:hidden rounded-full bg-primary-light dark:bg-primary-darker transition-colors duration-300 hover:bg-primary-dark dark:hover:bg-primary-light"
            >
              <HiX className="text-2xl text-primary dark:text-secondary-light" />
            </button>

            {/* Mobile Menu Items */}
            <ul className="space-y-4 w-full">
              {["home", "work", "about", "skills", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={() => setToggle(false)}
                    className="font-mulish py-4 px-4 text-text dark:text-text-dark text-[0.9rem] font-bold capitalize rounded-lg transition-colors duration-300 hover:bg-primary-lighter dark:hover:bg-secondary-lighter hover:text-primary-dark dark:hover:text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Resume Button */}
            <a
              href={resume || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 w-full"
            >
              <button className="w-full bg-primary dark:bg-primary-dark text-text dark:text-text-dark py-3 rounded-lg font-medium transition-all duration-300 hover:bg-primary-darker dark:hover:bg-primary-light">
                Resume
              </button>
            </a>

            {/* Theme Toggle Button in Mobile Menu */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-primary dark:bg-primary-dark text-text dark:text-text-dark py-3 rounded-lg font-medium transition-all duration-300 hover:bg-primary-darker dark:hover:bg-primary-light"
            >
              {theme === "dark" ? (
                <MdLightMode className="text-xl" />
              ) : (
                <MdDarkMode className="text-xl" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
