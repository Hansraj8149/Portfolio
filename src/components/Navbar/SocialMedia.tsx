import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const socialLinks = [
  { href: "https://www.linkedin.com/in/hansraj-saini-634864190/", icon: <FaLinkedin /> },
  { href: "https://www.instagram.com/direct/inbox/", icon: <BsInstagram /> },
  { href: "https://github.com/Hansraj8149?tab=repositories", icon: <FaGithub /> },
];

const SocialMedia= () => {
  return (
    <div className="flex flex-col items-center justify-end p-4 space-y-2">
      {socialLinks.map(({ href, icon }, index) => (
        <div key={index} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300  transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white">
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-lg">
            {icon}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
