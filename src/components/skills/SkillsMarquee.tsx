"use client"
import React from "react";
import {Marquee} from "./marquee";
import SkillCard from "./SkillCard";
import getSkillIcon from "./SkillIcons";
import {SkillsType} from "@/lib/models";
interface SkillsCategory {
  [category: string]: SkillsType[];
}

const SkillsMarquee = ({skillsByTag}: {skillsByTag: SkillsCategory}) => {
  const tags = Object.keys(skillsByTag);
  const rows = tags.map((tag) => skillsByTag[tag]);

  return (
    <div className="relative flex h-96 w-full  items-center justify-center gap-4 overflow-hidden">
      <div
        className="flex items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        {rows.map((row, index) => (
          <Marquee
            key={index}
            pauseOnHover
            vertical
            className={`[--duration:${20 + index * 2}s]`}
            reverse={index % 2 === 1}
          >
            {row.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill.skill.trim()}
                tag={skill.tag.trim()}
                icon={getSkillIcon(skill.skill)}
              />
            ))}
          </Marquee>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
};

export default SkillsMarquee;
