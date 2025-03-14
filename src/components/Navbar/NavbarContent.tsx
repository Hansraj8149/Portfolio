"use client";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { NavbarProps } from "@/lib/models";
import { useState } from "react";

const NavbarContent = ({ navbars }: { navbars: NavbarProps }) => {
  const [toggle, setToggle] = useState(false);
  const { theme, setTheme } = useTheme();

  const { navbarLinks, primaryButtonLink, primaryButtonText } = navbars;

  return (
    <nav className="fixed py-4 top-0 left-0 w-full z-50 bg-background dark:bg-background-dark">
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
          {navbarLinks.map(({ id, name, link }) => (
            <li key={id} className="group px-3 py-2">
              <a
                href={link}
                className="font-mulish px-1 text-text dark:text-text-dark text-[0.9rem] font-bold capitalize rounded-lg relative inline-block overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-primary-dark dark:group-hover:text-secondary-light">
                  {name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-secondary group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Resume & Theme Toggle */}
        <div className="flex items-center space-x-4">
          {primaryButtonLink && (
            <a
              href={primaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <button className="bg-primary dark:bg-primary-dark text-text-dark px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-darker dark:hover:bg-primary-light transform">
                {primaryButtonText}
              </button>
            </a>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-primary hover:bg-primary-dark"
          >
            {theme === "dark" ? (
              <MdLightMode className="text-2xl text-secondary-lighter" />
            ) : (
              <MdDarkMode className="text-2xl text-secondary-lighter" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 rounded-full bg-primary hover:bg-primary-dark"
            onClick={() => setToggle(true)}
          >
            <HiMenuAlt4 className="text-2xl text-secondary-lighter" />
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
              className="absolute top-5 right-5 p-2 md:hidden rounded-full bg-primary hover:bg-primary-dark"
            >
              <HiX className="text-2xl text-secondary-lighter" />
            </button>

            {/* Mobile Menu Items */}
            <ul className="space-y-4 w-full">
              {navbarLinks.map(({ id, name, link }) => (
                <li key={id}>
                  <a
                    href={link}
                    onClick={() => setToggle(false)}
                    className="font-mulish py-4 px-4 text-text dark:text-text-dark text-[0.9rem] font-bold capitalize rounded-lg hover:bg-primary-lighter dark:hover:bg-secondary-lighter hover:text-primary-dark dark:hover:text-primary"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Resume Button */}
            {primaryButtonLink && (
              <a
                href={primaryButtonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 w-full"
              >
                <button className="w-full bg-primary text-secondary-lighter py-3 rounded-lg font-medium hover:bg-primary-darker">
                  {primaryButtonText}
                </button>
              </a>
            )}

            {/* Theme Toggle Button in Mobile Menu */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-secondary-lighter py-3 rounded-lg font-medium hover:bg-primary-darker"
            >
              {theme === "dark" ? (
                <MdLightMode className="text-2xl text-secondary-lighter" />
              ) : (
                <MdDarkMode className="text-2xl text-secondary-lighter" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NavbarContent;
