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



  // Define icon mapping
  const getSkillIcon = (skillName: string): JSX.Element => {
    const iconMap: {[key: string]: JSX.Element} = {
      TypeScript: <SiTypescript />,
      "C/C++": <SiCplusplus />,
      Python: <SiPython />,
      Java: <FaJava />,
      SQL: <TbSql />,
      "HTML/CSS": <TbBrandHtml5 />,
      "React Native": <SiReact />,
      "Next.js": <SiNextdotjs />,
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
      "AWS (S3, SES, SNS)": <FaAws />,
      Monorepo: <RiFileCodeLine />,
      "CI/CD": <SiGithubactions />,
    };

    return iconMap[skillName.trim()] || <RiFileCodeLine />;
  };

  return (
    <section id="skills" className="w-full py-24 overflow-hidden">
      <div className="content-frame flex-col items-center justify-center">
        <div className="flex-col items-center justify-center max-w-3xl mx-auto text-center mb-16">
          <SectionHeader
            heading={skills.heading}
            subheading={skills.subheading}
            description={skills.description}
          />
        </div>

        <div className="flex items-center justify-center">
          <div
            className="relative w-full max-w-screen-lg overflow-hidden"
            style={{
              maskComposite: "intersect",
              maskImage: `
                linear-gradient(to right,  transparent, black 5rem),
                linear-gradient(to left,   transparent, black 5rem),
                linear-gradient(to bottom, transparent, black 5rem),
                linear-gradient(to top,    transparent, black 5rem)
              `,
            }}
          >
            <div className="mx-auto grid h-[250px] w-[300px] animate-skew-scroll grid-cols-1 gap-5 sm:w-[600px] sm:grid-cols-2">
              {skills.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex cursor-pointer items-center space-x-2 rounded-md border border-gray-100 px-5 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl dark:border-gray-800"
                >
                  {getSkillIcon(skill?.skill)}
                  <p className="text-gray-600">{skill?.skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppWrap(Skills, "skills");
