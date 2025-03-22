"use client";
import {Experience} from "@/lib/models";
import {useScroll, useTransform, motion} from "motion/react";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import Tag from "../Tag";

export const Timeline = ({experiences}: {experiences: Experience[]}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString.split(" - ")[0]);
    return date.toLocaleString("en-US", {month: "short", year: "numeric"});
  };

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const {scrollYProgress} = useScroll({
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
    <div className="w-full bg-background font-sans py-16 md:py-24" ref={containerRef}>
      <div ref={ref} className="relative max-w-4xl mx-auto px-4 md:px-6">
        {/* Timeline line with subtle glow */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-neutral-800/30">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-px bg-gradient-to-t from-primary via-primary/20 to-transparent rounded-full shadow-[0_0_8px_rgba(147,51,234,0.3)]"
          />
        </div>

        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className={`timeline-item flex justify-start pt-20 md:pt-40 gap-6 md:gap-12 ${activeIndex === index ? "z-10" : ""
              }`}
            initial={{opacity: 0, y: 30}}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {duration: 0.5, ease: "easeOut", delay: index * 0.08},
            }}
            viewport={{once: false, margin: "-10%"}}
          >
            {/* Date and timeline node */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start">
              <motion.div
                className="h-8 absolute lg:-left-2 md:-left-2 w-8 rounded flex items-center justify-center"
                animate={{
                  scale: activeIndex === index ? 1.1 : 1,
                  transition: {duration: 0.3},
                }}
              >
                <div
                  className={`h-3 w-3 rounded
                  ${activeIndex === index
                      ? "bg-background-secondary border-border shadow-md shadow-primary/15"
                      : "bg-background-secondary border-border"
                    } 
                  border transition-all duration-200`}
                />
              </motion.div>
              <motion.h3
                className="hidden md:block text-base md:text-lg font-medium md:pl-16 transition-colors duration-200 whitespace-nowrap"
                style={{
                  color: activeIndex === index ? 'var(--color-primary-light)' : 'var(--color-neutral-500)'
                }}
              >
                {experience === experiences[0]
                  ? "Present"
                  : formatDate(experience.fromDate)}{" "}
                - {formatDate(experience.toDate)}
              </motion.h3>
            </div>

            {/* Content card */}
            <motion.div
              className="relative pl-12 md:pl-8 pr-4 w-full p-4 rounded-lg backdrop-blur-sm"
              variants={{
                active: {
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                },
                inactive: {
                  boxShadow: "none",
                  backgroundColor: "transparent"
                }
              }}
              animate={activeIndex === index ? "active" : "inactive"}
              transition={{duration: 0.2}}
            >
              <h3 className="md:hidden block text-sm mb-3 text-left font-medium text-neutral-400">
                {experience === experiences[0]
                  ? "Present"
                  : formatDate(experience.fromDate)}{" "}
                - {formatDate(experience.toDate)}
              </h3>

              {/* Role and company */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <h4 className="text-xl font-semibold text-text-secondary">
                  {experience.role}
                </h4>
                <Tag tag={experience.company} />
              </div>

              <p className="text-secondary-light text-sm font-medium flex items-center mt-1 mb-4 opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {experience.location}
              </p>

              {/* Description */}
              {experience.description && (
                <motion.ul
                  className="mt-5 space-y-3 text-light-text-dark text-sm"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.2, duration: 0.4}}
                >
                  {experience.description.map((desc, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5"
                      initial={{opacity: 0, x: -8}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: 0.2 + i * 0.08, duration: 0.3}}
                    >
                      <svg
                        className="min-w-3.5 mt-0.5 text-primary"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="leading-relaxed">
                        {desc.children.map((child, idx) =>
                          child.bold ? (
                            <strong key={idx} className="text-primary-light font-medium">{child.text}</strong>
                          ) : (
                            <span key={idx}>{child.text}</span>
                          )
                        )}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {/* Images grid */}
              {experience?.images?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {experience?.images?.map((image, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      initial={{opacity: 0, scale: 0.9, y: 10}}
                      animate={{opacity: 1, scale: 1, y: 0}}
                      transition={{delay: 0.1 + (imgIndex * 0.08), duration: 0.3}}
                      className="relative group overflow-hidden"
                      style={{zIndex: experience?.images?.length - imgIndex}}
                    >
                      <Image
                        width={500}
                        height={500}
                        className="rounded-md object-cover w-16 lg:w-40 md:w-32 h-16 md:h-32 lg:h-40 shadow-sm transition-transform duration-300 group-hover:scale-105"
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${image?.url}`}
                        alt={`${experience?.company} image ${imgIndex + 1}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};