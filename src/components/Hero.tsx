import React from "react";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaCode } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Ripple } from "./magicui/ripple";
import GetSectionData from "./GetSectionData";
import { HeroProps } from "@/lib/models";

const iconMap = {
  LinkedIn: FaLinkedinIn,
  Github: FaGithub,
  Twitter: FaXTwitter,
  Email: FaEnvelope,
  Leetcode: FaCode, // Use a better icon if available
};
const Hero = async () => {
  const data = await GetSectionData("heroes");
  const hero: HeroProps = data?.data?.[0];

  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="home"
      className="w-full h-screen text-center flex items-center justify-center bg-background dark:bg-background-dark"
    >
      <div className="max-w-[1240px] mx-auto px-4">
        <p className="uppercase text-sm tracking-widest text-text dark:text-light-text-dark">
          {hero.title}
        </p>
        <h1 className="py-4 text-text dark:text-text-dark text-4xl font-bold">
          {hero.heading}
        </h1>
        <h2 className="py-2 text-text dark:text-text-dark text-3xl font-semibold">
          {hero.subheading}
        </h2>
        <p className="py-4 text-text-light dark:text-light-text-dark sm:max-w-[70%] mx-auto">
          {hero.description}
        </p>
        <div className="flex items-center justify-center space-x-6 py-4">
          {hero?.links?.map((link, index) => {
            const IconComponent =
              iconMap[link.name as keyof typeof iconMap] || FaCode; // Default icon if not found
            return (
              <a href={link.link} target="_blank" rel="noreferrer" key={index}>
                <div className="rounded-full bg-secondary-lighter p-4 cursor-pointer hover:scale-110 ">
                  <IconComponent className="w-6 h-6 text-primary-dark" />
                </div>
              </a>
            );
          })}
        </div>
        ;
      </div>
      <Ripple />
    </div>
  );
};

export default Hero;
