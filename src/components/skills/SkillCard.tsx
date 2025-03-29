import React, {JSX} from "react";
import {cn} from "@/lib/utils";

const SkillCard = ({
  skill,
  tag,
  icon,
}: {
  skill: string;
  tag: string;
  icon: JSX.Element;
}) => {
  const tagColorMap: {[key: string]: string} = {
    "Programming Languages": "border-blue-500/30 dark:border-blue-400/30 bg-blue-500/5 dark:bg-blue-400/10",
    "Frontend Development": "border-purple-500/30 dark:border-purple-400/30 bg-purple-500/5 dark:bg-purple-400/10",
    "Backend Development": "border-green-500/30 dark:border-green-400/30 bg-green-500/5 dark:bg-green-400/10",
    "DevOps Tools": "border-amber-500/30 dark:border-amber-400/30 bg-amber-500/5 dark:bg-amber-400/10",
  };

  const tagIconColorMap: {[key: string]: string} = {
    "Programming Languages": "text-blue-600 dark:text-blue-400",
    "Frontend Development": "text-purple-600 dark:text-purple-400",
    "Backend Development": "text-green-600 dark:text-green-400",
    "DevOps Tools": "text-amber-600 dark:text-amber-400",
  };

  return (
    <figure
      className={cn(
        "relative h-full w-36 cursor-pointer overflow-hidden rounded-xl border p-4 mb-4 hover:shadow-md transition-all duration-300",
        tagColorMap[tag] ||
        "border-gray-950/[.1] bg-gray-950/[.01] dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className={cn("text-2xl mb-2", tagIconColorMap[tag] || "dark:text-white")}>
          {icon}
        </div>
        <figcaption className="text-sm font-medium dark:text-white text-center">
          {skill}
        </figcaption>
        <p className="text-xs font-medium dark:text-white/40 text-center mt-2">
          {tag}
        </p>
      </div>
    </figure>
  );
};

export default SkillCard;
