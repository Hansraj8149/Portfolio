import React from "react";
import Image from "next/image";
import { SkillsProps } from "@/lib/models";
import SectionHeader from "./SectionHeader";
import GetSectionData from "./GetSectionData";
import { AppWrap } from "@/wrapper";
import Loader from "./Loader";

const Skills = async () => {
  const data = await GetSectionData("skills");
  const skills: SkillsProps = data?.data?.[0];

  if (!skills) {
    return <Loader />;
  }

  return (
    <section id="skills" className="w-full py-24 md:py-36 overflow-hidden">
      <div className="content-frame flex-col items-center justify-center">
        <div className="flex-col items-center justify-center max-w-3xl mx-auto text-center mb-16">
          <SectionHeader
            heading={skills.heading}
            subheading={skills.subheading}
            description={skills.description}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-8">
          {skills?.skills?.map((skill) => (
            <div key={skill.id} className="group">
              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 
                  bg-white dark:bg-background-light-dark shadow-sm hover:shadow-md 
                  transform hover:-translate-y-1 transition-all duration-300 
                  group-hover:bg-gradient-to-br from-gray-50 to-gray-100 
                  dark:group-hover:bg-gradient-to-br dark:from-background-light-dark dark:to-background-dark
                  border border-transparent group-hover:border-gray-100 dark:group-hover:border-gray-800"
                >
                  {/* Uncomment once you have images */}
                  {/* <Image
                    src={urlFor(skill.icon).url()}
                    alt={skill.name}
                    width={36}
                    height={36}
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  /> */}

                  {/* Placeholder for icon */}
                  <div
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 
                    flex items-center justify-center text-primary text-lg font-medium"
                  >
                    {skill.skill.charAt(0)}
                  </div>
                </div>

                <span
                  className="font-medium text-text dark:text-light-text-dark text-center 
                  text-sm group-hover:text-primary dark:group-hover:text-primary-light 
                  transition-colors duration-300 relative"
                >
                  {skill.skill}
                  <span
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                    bg-primary group-hover:w-full transition-all duration-300 opacity-0 
                    group-hover:opacity-100"
                  ></span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppWrap(Skills, "skills");
