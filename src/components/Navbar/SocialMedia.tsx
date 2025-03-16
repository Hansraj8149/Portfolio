import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import SocialIcon from "../hero/SocialIcon";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/hansraj-saini-634864190/",
    icon: <FaLinkedin className="w-4 h-4 text-primary" />,
  },
  {
    href: "https://www.instagram.com/direct/inbox/",
    icon: <BsInstagram className="w-4 h-4 text-primary" />,
  },
  {
    href: "https://github.com/Hansraj8149?tab=repositories",
    icon: <FaGithub className="w-4 h-4 text-primary" />,
  },
];

const SocialMedia = () => {
  return (
    <div className=" flex-col items-center justify-end p-4 space-y-3 hidden md:flex lg:flex">
      {socialLinks.map(({ href, icon }, index) => (
        <SocialIcon key={index} icon={icon} link={href} target="_blank" />
      ))}
    </div>
  );
};

export default SocialMedia;
