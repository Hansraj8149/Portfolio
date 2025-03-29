import React from "react";
import {FaGithub, FaLinkedinIn, FaEnvelope, FaCode} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import GetSectionData from "../GetSectionData";
import {HeroProps} from "@/lib/models";
import Loader from "../Loader";
import SocialIcon from "./SocialIcon";
import SectionHeader from "../SectionHeader";
import {Spotlight} from "./spotlight-new";

const iconMap = {
  LinkedIn: FaLinkedinIn,
  Github: FaGithub,
  Twitter: FaXTwitter,
  Email: FaEnvelope,
  Leetcode: FaCode,
};
const Hero = async () => {
  const data = await GetSectionData("heroes");
  const hero: HeroProps = data?.data?.[0];

  if (!hero) {
    return <Loader />;
  }

  return (
    <div
      id="home"
      className="py-44 text-center w-full bg-black flex items-center justify-center relative overflow-hidden"
    >
      <Spotlight />
      <div className="content-frame flex-col gap-4">
        <p className="uppercase text-2xl tracking-widest text-text font-nanum-pen-script">
          {hero.title}
        </p>
        <SectionHeader
          heading={hero.heading}
          subheading={hero.subheading}
          description={hero.description}
        />
        <div className="flex items-center justify-center py-4">
          {hero?.links?.map((link, index) => {
            const IconComponent =
              iconMap[link.name as keyof typeof iconMap] || FaCode;
            return (
              <div
                className="rounded bg-secondary-lighter lg:p-4 p-2 cursor-pointer hover:scale-110"
                key={index}
              >
                <SocialIcon
                  className="bg-secondary-lighter"
                  link={link.link}
                  target="_blank"
                  icon={<IconComponent className="w-6 h-6 text-accent" />}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
