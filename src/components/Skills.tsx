import React from "react";
import Image from "next/image";
import { SkillsProps } from "@/lib/models";
import SectionHeader from "./SectionHeader";
import GetSectionData from "./GetSectionData";

const Skills = async () => {
  const data = await GetSectionData("skills");
  const skills: SkillsProps = data?.data?.[0];

  if (!skills) {
    return <div>Loading...</div>;
  }
  return (
    <section className="py-20 content-frame">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading={data.heading}
          subheading={data.subheading}
          description={data.description}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {skills?.skills?.map((skill) => (
            <div key={skill.id} className="flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center dark:bg-background-light-dark mb-3 duration-300"
                style={{ backgroundColor: "#ffffff" }}
              >
                {/* <Image
                  src={urlFor(skill.icon).url()}
                  alt={skill.name}
                  width={36}
                  height={36}
                  className="object-contain"
                /> */}
              </div>
              <p className="font-medium text-light-text dark:text-light-text-dark">
                {skill.skill}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
