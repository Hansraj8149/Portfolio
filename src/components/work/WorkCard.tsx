"use client"
import React from "react";
import {AiFillEye, AiFillGithub} from "react-icons/ai";
import Image from "next/image";
import {WorkType} from "@/lib/models";
import {motion} from "framer-motion";

interface WorkCardProps {
  work: WorkType;
  colors: {
    background: string;
    text: string;
    accent: string;
  };
}

const WorkCard = ({work, colors}: WorkCardProps) => {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-2xl ${colors.background} flex flex-col md:flex-row`}>
      {work?.image?.length > 0 && (
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <div className="flex flex-wrap gap-4 justify-center">
            {work?.image?.map((image, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                  delay: 0.1 + (imgIndex * 0.1),
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120
                }}
                className="relative group overflow-hidden rounded-xl"
              >
                <Image
                  width={500}
                  height={500}
                  className="object-cover w-40 h-40 rounded-xl transform transition-transform duration-300 group-hover:scale-110"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${image?.url}`}
                  alt={`${image.name} image ${imgIndex + 1}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className={`w-full md:w-1/2 p-8 flex flex-col justify-between ${colors.text}`}>
        <div>
          <h4 className="text-3xl font-bold mb-4 tracking-tight">
            {work?.title}
          </h4>

          <p className={`mb-6 text-base opacity-80 leading-relaxed`}>
            {work?.description[0]?.children[0]?.text}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {work?.skillTags?.map((skillTag) => (
              <span
                key={skillTag.id}
                className={`${colors.accent} text-white text-xs px-3 py-1 rounded-full`}
              >
                {skillTag.tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          {work?.liveLink && (
            <a
              href={work.liveLink}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 ${colors.text} hover:opacity-80 transition-opacity`}
            >
              <AiFillEye size={24} />
              <span className="font-medium">Live Demo</span>
            </a>
          )}

          {work?.githubLink && (
            <a
              href={work.githubLink}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 ${colors.text} hover:opacity-80 transition-opacity`}
            >
              <AiFillGithub size={24} />
              <span className="font-medium">View Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
