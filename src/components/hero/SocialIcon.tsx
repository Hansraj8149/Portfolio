import React from "react";

interface SocialIconProps {
  icon: React.ReactNode;
}
const SocialIcon = ({ icon }: SocialIconProps) => {
  return (
    <button className="relative flex items-center justify-center w-[40px] h-[40px] border-none bg-transparent rounded-lg cursor-pointer transition-all duration-300 group">
      <span className="flex items-center justify-center w-full h-full bg-transparent border border-gray-500/50 rounded-lg transition-all duration-300 group-hover:bg-gray-500/50 group-hover:backdrop-blur-sm">
        {icon}
      </span>
      <span className="absolute inset-0 w-full h-full bg-[#181818] rounded-lg -z-10 transition-transform duration-300 group-hover:rotate-[35deg] origin-bottom" />
    </button>
  );
};

export default SocialIcon;
