import React from "react";
import { AppWrap } from "@/wrapper";
import PhotoCard from "./PhotoCard";
import { AboutProps } from "@/lib/models";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { FiAward, FiCode } from "react-icons/fi";
import GetSectionData from "../GetSectionData";
import SkillCard from "./SkillCard";
import Loader from "../Loader";
import SectionHeader from "../SectionHeader";
import Button from "../Button";
import { IconArrowRight } from "@tabler/icons-react";

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
    return <Loader />;
  }

  return (
    <section id="about" className="w-full py-36">
      <div className=" content-frame flex-col items-center justify-center">
        <div className=" flex-col items-center justify-center ">
          <SectionHeader
            heading={abouts.heading}
            subheading={abouts.subheading}
            description={abouts.description}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-5xl font-bold text-light-text mb-5 font-nanum-pen-script">
              {abouts.title}
            </h3>

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

            <div className="mt-8 flex items-start">
              {abouts.buttonText && (
                <Button
                  text={abouts.buttonText}
                  link={abouts.buttonLink}
                  icon={
                    <IconArrowRight className="z-20 lg:size-6 md:size-6 size-4" />
                  }
                />
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <PhotoCard
              heading={abouts.photoCard.heading}
              subheading={abouts.photoCard.subheading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppWrap(About, "about");
