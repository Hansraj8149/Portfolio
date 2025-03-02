import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/hansraj-saini-634864190/",
    icon: <FaLinkedin className="w-4 h-4 text-primary-darker" />,
  },
  {
    href: "https://www.instagram.com/direct/inbox/",
    icon: <BsInstagram className="w-4 h-4 text-primary-darker" />,
  },
  {
    href: "https://github.com/Hansraj8149?tab=repositories",
    icon: <FaGithub className="w-4 h-4 text-primary-darker" />,
  },
];

const SocialMedia = () => {
  return (
    <div className=" flex-col items-center justify-end p-4 space-y-2 hidden md:flex lg:flex">
      {socialLinks.map(({ href, icon }, index) => (
        <div
          key={index}
          className="rounded-full bg-light-text p-4 cursor-pointer hover:scale-110 w-8 h-8 flex items-center justify-center transition-all duration-300"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white text-lg"
          >
            {icon}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
