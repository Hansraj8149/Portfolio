"use client";
import React from "react";
import {motion} from "motion/react";
import Image from "next/image";
import {WorkType} from "@/lib/models";
import {AiFillEye, AiFillGithub} from "react-icons/ai";
import Tag from "../Tag";
import SpotlightButton from "../SpotlightButton";
import {IoCheckmark} from "react-icons/io5";

interface WorkCardProps {
  works: WorkType[];
  activeCard: number;
  ref: React.Ref<HTMLDivElement>;
}

export const StickyScroll = ({works, activeCard, ref}: WorkCardProps) => {
  return (
    <motion.div
      ref={ref}
      className="relative flex h-[35rem] justify-center overflow-y-auto w-full no-scrollbar"
    >
      <div className="flex items-start px-4 max-w-3xl w-full flex-col mb-24">
        {works.map((item, index) => (
          <motion.div
            key={item?.title}
            className="px-0 lg:px-10 py-14 pb-36 flex flex-col gap-6"
            initial={{opacity: 0, y: 20}}
            animate={{
              opacity: activeCard === index ? 1 : 0,
              y: activeCard === index ? 0 : 20,
              pointerEvents: activeCard === index ? "auto" : "none"
            }}
            transition={{duration: 0.5}}
          >
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400"
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.1, duration: 0.4}}
            >
              {item?.title}
            </motion.h2>

            {item?.description && (
              <motion.ul
                className=" text-slate-300 text-xs md:text-sm lg:text-base"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.3, duration: 0.5}}
              >
                {item?.description.map((desc, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{opacity: 0, x: -10}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.3 + i * 0.1, duration: 0.4}}
                  >
                    <span>
                      <IoCheckmark className="text-accent lg:h-5 lg:w-5 h-3 w-3 mt-1" />
                    </span>
                    <span className="leading-relaxed">
                      {desc?.children?.map((child, idx) =>
                        child.bold ? (
                          <strong key={idx} className="text-teal-300 font-semibold">{child.text}</strong>
                        ) : (
                          <span key={idx}>{child.text}</span>
                        )
                      )}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.5, duration: 0.4}}
            >
              {item.skillTags?.map((skill) => (
                <Tag key={skill.id} tag={skill.tag} />
              ))}
            </motion.div>

            {/* Project Links */}
            <motion.div
              className="flex gap-4"
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.6, duration: 0.4}}
            >
              {item.liveLink && (
                <SpotlightButton
                  variant="secondary"
                  text="Live"
                  link={item?.liveLink}
                  target="_blank"
                  icon={<AiFillEye className="h-full w-full text-text-secondary" />}
                />
              )}

              {item.githubLink && (
                <SpotlightButton
                  variant="primary"
                  text="Code"
                  link={item?.githubLink}
                  target="_blank"
                  icon={<AiFillGithub className="h-full w-full" />}
                />
              )}


            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div

        className="sticky top-48 lg:top-28 w-56 h-36 lg:h-72 lg:w-80 rounded-lg lblock overflow-hidden px-4"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${works[activeCard]?.image[0]?.url}`}
          width={320}
          height={320}
          className="h-full w-full object-cover"
          alt={works[activeCard]?.image[0]?.alternativeText || "Hansraj Saini - Full Stack Developer"}
        />
      </motion.div>
    </motion.div>
  );
};
