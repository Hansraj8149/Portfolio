"use client";
import {Experience} from "@/lib/models";
import {useScroll, useTransform, motion} from "motion/react";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import Tag from "../Tag";
import {IoCheckmark, IoLocationOutline} from "react-icons/io5";

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
    <div className="w-full bg-background py-16 md:py-24" ref={containerRef}>
      <div ref={ref} className="relative md:px-6">
        <div className="absolute lg:left-6  top-0 bottom-0 w-px bg-neutral-800/30">
          <motion.div
            style={{height: heightTransform, opacity: opacityTransform}}
            className="absolute top-0 w-px bg-gradient-to-t from-primary via-primary/20 to-transparent rounded-full shadow-[0_0_8px_rgba(147,51,234,0.3)]"
          />
        </div>

        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className={`timeline-item flex justify-start lg:gap-12 ${activeIndex === index ? "z-10" : ""
              }`}
            initial={{opacity: 0, y: 30}}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {duration: 0.5, ease: "easeOut", delay: index * 0.08},
            }}
            viewport={{once: false, margin: "-10%"}}
          >
            <div className="sticky flex lg:w-2/6 z-40 items-center justify-start">
              <motion.div
                className="h-8  w-8 rounded flex items-center justify-start "
                animate={{scale: activeIndex === index ? 1.5 : 1, transition: {duration: 0.3}}}
              >
                <div
                  className={`h-3 w-3 rounded border ${activeIndex === index
                    ? "bg-accent-light border-border shadow-primary/15 shadow-md"
                    : "bg-primary border-border"
                    } transition-all duration-200`}
                />
              </motion.div>
              <motion.h3
                className=" hidden lg:block text-xs lg:text-base font-medium  transition-colors duration-200"
                style={{color: activeIndex === index ? "var(--color-primary-light)" : "var(--color-neutral-500)"}}
              >
                {experience === experiences[0] ? "Present" : formatDate(experience.fromDate)} -{" "}
                {formatDate(experience.toDate)}
              </motion.h3>
            </div>

            <motion.div
              className="relative w-full p-8 rounded border border-border mb-24 backdrop-blur-sm"
              variants={{
                active: {boxShadow: "0 2px 12px rgba(0,0,0,0.08)", backgroundColor: "rgba(255,255,255,0.02)"},
                inactive: {boxShadow: "none", backgroundColor: "transparent"},
              }}
              animate={activeIndex === index ? "active" : "inactive"}
              transition={{duration: 0.2}}
            >
              <h3 className="md:hidden block text-sm mb-3 font-medium text-neutral-400">
                {experience === experiences[0] ? "Present" : formatDate(experience.fromDate)} -{" "}
                {formatDate(experience.toDate)}
              </h3>

              <div className="flex justify-between items-center gap-3 mb-4">
                <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-emerald-400 bg-clip-text">
                  {experience.role}
                </h4>
                <Tag tag={experience.company} />
              </div>

              <p className="text-secondary-light text-xs lg:text-sm font-medium flex items-center gap-2">
                <IoLocationOutline className="text-accent lg:h-5 lg:w-5 h-3 w-3 " />
                {experience.location}
              </p>

              {experience.description && (
                <motion.ul className="mt-5 space-y-3 text-light-text-dark text-sm" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2, duration: 0.4}}>
                  {experience.description.map((desc, i) => (
                    <motion.li key={i} className="flex items-start gap-2.5" initial={{opacity: 0, x: -8}} animate={{opacity: 1, x: 0}} transition={{delay: 0.2 + i * 0.08, duration: 0.3}}>
                      <span>
                        <IoCheckmark className="text-accent lg:h-5 lg:w-5 h-3 w-3 mt-1" />
                      </span>
                      <span className="leading-relaxed">
                        {desc.children.map((child, idx) =>
                          child.bold ? <strong key={idx} className="text-primary-light font-medium">{child.text}</strong> : <span key={idx}>{child.text}</span>
                        )}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {experience?.images?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {experience.images.map((image, imgIndex) => (
                    <motion.div key={imgIndex} initial={{opacity: 0, scale: 0.9, y: 10}} animate={{opacity: 1, scale: 1, y: 0}} transition={{delay: 0.1 + imgIndex * 0.08, duration: 0.3}} className="relative group">
                      <Image width={500} height={500} className="rounded-md object-cover w-16 lg:w-40 md:w-32 h-16 md:h-32 lg:h-40 transition-transform group-hover:scale-105" src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${image.url}`} alt={`${image?.alternativeText || "Hansraj Saini - Full Stack Developer"} image ${imgIndex + 1}`} />
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
