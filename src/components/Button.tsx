"use client";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  text: string;
  link: string;
  target?: string;
  icon?: React.ReactNode;
}

const Button = ({ text, link, target, icon }: ButtonProps) => {
  return (
    <Link href={link} target={target} className="flex justify-center">
      <button className="relative flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 font-bold text-sm sm:text-base lg:text-lg text-text transition-all duration-300 ease-in-out bg-transparent border-none cursor-pointer overflow-hidden group">
        <span className="relative z-10 flex items-center lg:text-base text-sm">
          {text}
        </span>
        {icon}
        <span className="absolute top-1/2 left-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-button-hover rounded-full transition-all duration-300 ease-in-out transform -translate-y-1/2 group-hover:w-full"></span>
      </button>
    </Link>
  );
};

export default Button;
