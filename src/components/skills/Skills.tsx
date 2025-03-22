import React, {JSX} from "react";
import {SkillsProps} from "@/lib/models";
import SectionHeader from "../SectionHeader";
import GetSectionData from "../GetSectionData";
import {AppWrap} from "@/wrapper";
import Loader from "../Loader";
import {
  SiTypescript,
  SiCplusplus,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiPrisma,
  SiGit,
  SiDocker,
  SiGithubactions,
} from "react-icons/si";
import {FaAws, FaJava} from "react-icons/fa";
import {TbSql, TbBrandHtml5, TbApi, TbWebhook} from "react-icons/tb";
import {RiFileCodeLine} from "react-icons/ri";

const Skills = async () => {
  const data = await GetSectionData("skills");
  const skills: SkillsProps = data?.data?.[0];

  if (!skills) {
    return <Loader />;
  }

  // Group skills by tag
  const groupedSkills = skills?.skills?.reduce(
    (acc: {[key: string]: typeof skills.skills}, skill) => {
      const tag = skill.tag.trim();
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(skill);
      return acc;
    },
    {}
  );

  // Define icon mapping
  const getSkillIcon = (skillName: string): JSX.Element => {
    const iconMap: {[key: string]: JSX.Element} = {
      TypeScript: <SiTypescript />,
      "C/C++": <SiCplusplus />,
      Python: <SiPython />,
      Java: <FaJava />,
      SQL: <TbSql />,
      " HTML/CSS": <TbBrandHtml5 />,
      "React Native": <SiReact />,
      " Next.js": <SiNextdotjs />,
      Tamagui: <RiFileCodeLine />,
      TailwindCSS: <SiTailwindcss />,
      Strapi: <RiFileCodeLine />,
      "Express.js": <SiExpress />,
      Prisma: <SiPrisma />,
      PostgreSQL: <SiPostgresql />,
      MongoDB: <SiMongodb />,
      "REST APIs": <TbApi />,
      WebSockets: <TbWebhook />,
      "Git/GitHub": <SiGit />,
      Docker: <SiDocker />,
      " AWS (S3, SES, SNS)": <FaAws />,
      Monorepo: <RiFileCodeLine />,
      "CI/CD": <SiGithubactions />,
    };

    const cleanSkillName = skillName.trim();
    return iconMap[cleanSkillName] || <RiFileCodeLine />;
  };

  return (
    <section id="skills" className="w-full py-24 md:py-24 overflow-hidden">
      <div className="content-frame flex-col items-center justify-center">
        <div className="flex-col items-center justify-center max-w-3xl mx-auto text-center mb-16">
          <SectionHeader
            heading={skills.heading}
            subheading={skills.subheading}
            description={skills.description}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-background-light p-6 rounded  border border-border">
              <h3 className="text-xl font-semibold mb-4 text-text-secondary">
                {category}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.skill}
                    className="flex items-center space-x-2 p-3 bg-background rounded"
                  >
                    <span className="text-primary">
                      {getSkillIcon(skill.skill)}
                    </span>
                    <span className="text-base">{skill.skill.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppWrap(Skills, "skills");
