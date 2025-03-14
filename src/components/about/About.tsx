import React from "react";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { AppWrap } from "@/wrapper";
import PhotoCard from "./PhotoCard";
import { AboutProps } from "@/lib/models";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { FiAward, FiCode } from "react-icons/fi";
import GetSectionData from "../GetSectionData";
import SkillCard from "./SkillCard";

const getIcon = (index: number) => {
  const icons = [
    <HiOutlineLightBulb
      key="lightbulb"
      className="text-primary-dark"
      size={24}
    />,
    <RiCodeSSlashLine
      key="code-slash"
      className="text-primary-dark"
      size={24}
    />,
    <FiAward key="award" className="text-primary-dark" size={24} />,
    <FiCode key="code" className="text-primary-dark" size={24} />,
  ];
  return icons[index % icons.length];
};

const About = async () => {
  const data = await GetSectionData("abouts");
  const abouts: AboutProps = data?.data?.[0];

  if (!abouts) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="about"
      className="w-full min-h-screen bg-background dark:bg-background-dark py-20 content-frame"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-0">
        <span className="text-primary-dark text-sm font-bold uppercase mb-4">
          {abouts?.heading}
        </span>
        <h2 className="text-3xl font-semibold text-text dark:text-text-dark font-mulish mb-6">
          {abouts.subheading}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Left Section */}
        <div className="md:col-span-3 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-light-text dark:text-light-text-dark mb-3">
              {abouts.title}
            </h3>
            <p className="text-light-text dark:text-light-text-dark leading-relaxed mb-6">
              {abouts.description}
            </p>
          </div>

          {/* Skill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {abouts.aboutPoints.map((point, index) => (
              <SkillCard
                key={point.id}
                icon={getIcon(index)}
                title={point.title}
                description={point.description[0].children[0].text}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link href={abouts.buttonLink}>
              <button className="flex px-4 bg-primary text-secondary-lighter py-2 rounded-lg font-medium hover:bg-primary-darker">
                {abouts.buttonText} <BsArrowRightShort size={24} />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section - Photo Card */}
        <div className="md:col-span-2 flex justify-center">
          <PhotoCard
            heading={abouts.photoCard.heading}
            subheading={abouts.photoCard.subheading}
          />
        </div>
      </div>
    </div>
  );
};

export default AppWrap(About, "about");
