import React from "react";
import {SkillsProps, SkillsType} from "@/lib/models";
import SectionHeader from "../SectionHeader";
import {getSectionData} from "@/utils/utils";
import {AppWrap} from "@/wrapper";
import Loader from "../Loader";
import SkillsMarquee from "./SkillsMarquee";

const Skills = async () => {
  const data = await getSectionData("skills");

  const skills: SkillsProps = data?.data?.length ? data.data[0] : null;

  if (!skills) return <Loader />;

  const skillsByTag: {[key: string]: SkillsType[]} = skills?.skills?.reduce((acc: {[key: string]: SkillsType[]}, skill: SkillsType) => {
    const tag = skill.tag.trim();
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="w-full py-24 overflow-hidden">
      <div className="content-frame flex-col items-center justify-center gap-12">
        <SectionHeader
          heading={skills?.heading}
          subheading={skills?.subheading}
          description={skills?.description}
        />
        <SkillsMarquee skillsByTag={skillsByTag} />
      </div>
    </section>
  );
};

export default AppWrap(Skills, "skills");
