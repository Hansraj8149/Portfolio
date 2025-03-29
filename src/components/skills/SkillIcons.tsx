import React, {JSX} from "react";
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
  SiStrapi,
} from "react-icons/si";
import {FaAws, FaJava} from "react-icons/fa";
import {TbSql, TbBrandHtml5, TbApi, TbWebhook} from "react-icons/tb";
import {RiFileCodeLine} from "react-icons/ri";

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
    Strapi: <SiStrapi />,
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

export default getSkillIcon;
