"use client";
import { Experience } from "@/lib/models";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ experiences }: { experiences: Experience[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString.split(" - ")[0]);

    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const items = ref.current.querySelectorAll(".timeline-item");
      const windowHeight = window.innerHeight;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-background font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className={`timeline-item flex justify-start pt-10 md:pt-40 md:gap-10 ${
              activeIndex === index ? "z-10" : ""
            }`}
            initial={{ opacity: 0.6, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: index * 0.1 },
            }}
            viewport={{ once: false, margin: "-20%" }}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div
                className={`h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center ${
                  activeIndex === index ? "scale-110" : ""
                }`}
                animate={{
                  scale: activeIndex === index ? 1.1 : 1,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className={`h-4 w-4 rounded-full 
                  ${
                    activeIndex === index
                      ? "bg-primary-dark border-primary-darker"
                      : "bg-neutral-800 border-neutral-700"
                  } 
                  border p-2 transition-all duration-300`}
                />
              </motion.div>
              <motion.h3 className="hidden md:block text-xl md:pl-20 md:text-2xl font-bold transition-colors duration-300 text-neutral-500">
                {experience === experiences[0]
                  ? "Present"
                  : formatDate(experience.fromDate)}{" "}
                - {formatDate(experience.toDate)}
              </motion.h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-neutral-500">
                {experience === experiences[0]
                  ? "Present"
                  : formatDate(experience.fromDate)}{" "}
                - {formatDate(experience.toDate)}
              </h3>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h4 className="text-2xl font-semibold text-background">
                  {experience.role}
                </h4>
                <span className="text-sm  bg-primary/20 text-primary-light px-3 py-1 rounded-full">
                  {experience.company}
                </span>
              </div>

              <p className="text-secondary-light font-medium flex items-center mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {experience.location}
              </p>

              {experience.technologies && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/80 hover:bg-primary text-secondary-lighter px-3 py-1 rounded-full text-xs transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {experience.description && (
                <ul className="mt-4 space-y-3 text-light-text-dark">
                  {experience.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className="min-w-4 mt-1"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>
                        {desc.children.map((child) => child.text).join(" ")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}

        <div className="absolute md:left-8 left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-background-lighter to-transparent">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary-dark via-primary/10 to-transparent rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};
