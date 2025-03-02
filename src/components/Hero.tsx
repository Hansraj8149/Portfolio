"use client";

import React from "react";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MotionWrap } from "@/wrapper";
import { Ripple } from "./magicui/ripple";
import { BackgroundLines } from "./ui/background-lines";

const Hero = () => {
  return (
    <BackgroundLines>
      <div
        id="home"
        className="w-full h-screen text-center flex items-center justify-center"
      >
        {/* <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
          )}
          width={20}
          height={20}
          squares={[80, 80]}
          squaresClassName="hover:fill-blue-500"
        /> */}
        <div className="max-w-[1240px] mx-auto px-4">
          <p className="uppercase text-sm tracking-widest text-light">
            LET&apos;S BUILD SOMETHING AWESOME
          </p>
          <h1 className="py-4 text-text text-4xl font-bold">
            Hi, I&apos;m <span className="text-primary">Hansraj</span>
          </h1>
          <h2 className="py-2 text-text text-3xl font-semibold">
            A Fullstack Developer
          </h2>
          <p className="py-4 text-light-text sm:max-w-[70%] mx-auto">
            I love solving problems, building things from scratch, and taking on
            new challenges. Engineering scalable and efficient solutions excites
            me, and I’m always exploring new technologies to improve my craft.
          </p>

          <div className="flex items-center justify-center space-x-6 py-4">
            <a
              href="https://www.linkedin.com/in/hansraj-saini-634864190/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="rounded-full bg-light-text p-4 cursor-pointer hover:scale-110 transition duration-300">
                <FaLinkedinIn className="w-6 h-6 text-primary-darker" />
              </div>
            </a>

            <a
              href="https://github.com/Hansraj8149?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <div className="rounded-full bg-light-text p-4 cursor-pointer hover:scale-110 transition duration-300">
                <FaGithub className="w-6 h-6 text-primary-darker" />
              </div>
            </a>

            <Link href="/#contact">
              <div className="rounded-full bg-light-text p-4 cursor-pointer hover:scale-110 transition duration-300">
                <EnvelopeIcon className="w-6 h-6 text-primary-darker" />
              </div>
            </Link>
          </div>
        </div>
        <Ripple />
      </div>
    </BackgroundLines>
  );
};

export default MotionWrap(Hero, "home");
