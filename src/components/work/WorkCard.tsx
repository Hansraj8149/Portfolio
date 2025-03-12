import React, { useState, useMemo, MutableRefObject } from "react";
import { motion } from "framer-motion";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { urlFor } from "@/sanity/lib/client";
import { WorkType } from "@/lib/models";

interface WorkCardProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  work: WorkType;
  className?: string;
}

const WorkCard = ({ containerRef, work, className }: WorkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const randomStyles = useMemo(
    () => ({
      top: `${Math.floor(Math.random() * 60 + 20)}%`,
      left: `${Math.floor(Math.random() * 60 + 20)}%`,
      rotate: `${Math.floor(Math.random() * 10 - 10)}deg`,
    }),
    []
  );

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      style={randomStyles}
      dragElastic={0.3}
      className="absolute cursor-grab active:cursor-grabbing drag-elements will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-48 md:w-56 lg:w-64 rounded-xl overflow-hidden bg-background border border-border dark:bg-background-dark dark:border-border-dark-mode">
        <div className="relative lg:h-40 md:h-36 h-24 overflow-hidden">
          <Image
            width={300}
            height={200}
            className={twMerge(
              "object-cover w-full h-full",
              className,
              isHovered ? "scale-110" : "scale-100"
            )}
            src={urlFor(work?.image).url()}
            alt={work?.title || "Project Image"}
          />

          <div
            className={clsx(
              "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center gap-4",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <a
              href={work?.liveLink}
              target="_blank"
              rel="noreferrer"
              aria-label="View Project"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-secondary-lighter rounded-full backdrop-blur-sm">
                <AiFillEye size={20} className="text-primary-dark" />
              </div>
            </a>
            <a
              href={work?.githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label="View Code"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-secondary-lighter rounded-full backdrop-blur-sm">
                <AiFillGithub size={20} className="text-primary-dark" />
              </div>
            </a>
          </div>
        </div>

        <div className="p-4">
          <h4 className="text-lg font-bold text-text dark:text-text-dark mb-1 line-clamp-1">
            {work?.title}
          </h4>
          <p className="text-text-light dark:text-light-text-dark text-sm mb-2 line-clamp-2">
            {work?.description?.children[0].text}
          </p>
          <div className="flex flex-wrap gap-2">
            {work?.workTags?.map((tag, index) => (
              <span
                key={index}
                className="bg-secondary-lighter text-text border border-border text-xs p-2 rounded-full dark:border-border-dark-mode"
              >
                {tag.toString()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
