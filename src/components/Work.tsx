"use client";
import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  useMemo,
} from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import { urlFor, client } from "@/sanity/lib/client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface WorkType {
  imgUrl: string;
  name: string;
  projectLink: string;
  codeLink: string;
  title: string;
  description: string;
  tags: string[];
}
const Work = () => {
  const [works, setWorks] = useState<WorkType[]>([]);
  const [filterWork, setFilterWork] = useState<WorkType[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);

    setTimeout(() => {
      setFilterWork(
        item === "All"
          ? works
          : works.filter((work) => work.tags.includes(item))
      );
    }, 500);
  };

  return (
    <div className="flex flex-col items-center content-frame bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <h2 className="text-3xl font-semibold text-center my-8">
        My Creative{" "}
        <span className="font-bold text-primary dark:text-primary-light">
          Portfolio
        </span>
      </h2>

      <div className="flex flex-wrap justify-center mb-12 gap-3">
        {["UI/UX", "Node JS", "Next JS", "React JS", "All"].map(
          (item, index) => (
            <button
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={clsx(
                "px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105",
                activeFilter === item
                  ? "bg-primary text-white shadow-lg dark:bg-primary-dark"
                  : "bg-secondary-light text-text border border-border hover:border-primary hover:text-primary dark:bg-secondary-darker dark:text-dark-text-dark dark:border-border-dark-mode dark:hover:border-primary-light"
              )}
            >
              {item}
            </button>
          )
        )}
      </div>

      <div
        className="inset-0 z-10 relative min-h-screen w-full place-content-center overflow-hidden"
        ref={containerRef}
      >
        {filterWork.map((work, index) => {
          return <Card key={index} containerRef={containerRef} work={work} />;
        })}
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Work, "work"), "work");

interface Props {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  work: WorkType;

  className?: string;
}

const Card = ({ containerRef, work, className }: Props) => {
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
      <div className="w-48 md:w-56 lg:w-64 rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-background border border-border dark:bg-background-dark dark:border-border-dark-mode hover:shadow-2xl">
        <div className="relative lg:h-40 md:h-36 h-24 overflow-hidden">
          <Image
            width={300}
            height={200}
            className={twMerge(
              "object-cover w-full h-full transition-transform duration-500",
              className,
              isHovered ? "scale-110" : "scale-100"
            )}
            src={urlFor(work.imgUrl).url()}
            alt={work.name || "Project Image"}
          />

          <div
            className={clsx(
              "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center gap-4 sm:gap-3 xs:gap-2",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <a
              href={work.projectLink}
              target="_blank"
              rel="noreferrer"
              aria-label="View Project"
            >
              <div className="w-10 h-10 sm:w-9 sm:h-9 xs:w-8 xs:h-8 flex items-center justify-center bg-white/90 text-blue-600 rounded-full shadow-lg backdrop-blur-sm">
                <AiFillEye size={20} />
              </div>
            </a>
            <a
              href={work.codeLink}
              target="_blank"
              rel="noreferrer"
              aria-label="View Code"
            >
              <div className="w-10 h-10 sm:w-9 sm:h-9 xs:w-8 xs:h-8 flex items-center justify-center bg-white/90 text-gray-800 rounded-full shadow-lg backdrop-blur-sm">
                <AiFillGithub size={20} />
              </div>
            </a>
          </div>
        </div>

        <div className="p-4 sm:p-3 xs:p-2">
          <h4 className="lg:text-lg md:text-base text-sm font-bold text-text dark:text-text-dark mb-1 line-clamp-1">
            {work.title}
          </h4>
          <p className="text-text-light dark:text-light-text-dark lg:text-sm md:text-xs text-[11px] mb-2 line-clamp-2">
            {work.description}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-1">
            {work.tags &&
              work.tags.map((tag, index) => (
                <span
                  key={`tag-${index}`}
                  className="inline-block bg-secondary-lighter text-primary px-3 sm:px-2 xs:px-2 py-1 rounded-full lg:text-xs md:text-[11px] text-[10px] font-medium border border-border-light dark:bg-secondary-dark dark:text-primary-light dark:border-border-dark-mode"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
