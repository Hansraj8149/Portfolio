import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="#"
      className="flex items-center pr-8">
      <h1 className="font-nanum-pen-script text-4xl lg:text-5xl font-bold text-primary">
        H
      </h1>
      <h1 className="font-nanum-pen-script text-3xl lg:text-4xl font-bold text-text">
        S
      </h1>
    </Link>
  );
};

export default Logo;
