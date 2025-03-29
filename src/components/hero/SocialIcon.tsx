import clsx from "clsx";
import React from "react";

interface SocialIconProps {
  icon: React.ReactNode;
  className?: string;
  link?: string;
  target?: string;
}
const SocialIcon = ({icon, className, link, target}: SocialIconProps) => {
  return (
    <a
      href={link}
      target={target}
      className={clsx(
        "relative flex items-center justify-center w-[40px] h-[40px] border-none bg-transparent rounded-lg cursor-pointer transition-all duration-300 group",
        className
      )}
    >
      <span className="flex items-center justify-center w-full h-full bg-transparent border border-border rounded-lg transition-all duration-300 group-hover:bg-border/50 group-hover:backdrop-blur-sm">
        {icon}
      </span>
      <span className="absolute inset-0 w-full h-full bg-[#181818] rounded-lg -z-10 transition-transform duration-300 group-hover:rotate-[35deg] origin-bottom" />
    </a>
  );
};

export default SocialIcon;
