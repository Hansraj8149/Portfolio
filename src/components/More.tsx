"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import { FiArrowUpRight } from "react-icons/fi";
import { ExpertiseProps } from "@/lib/models";
import SectionHeader from "./SectionHeader";

const More = () => {
  const [more, setMore] = useState<ExpertiseProps | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchExpertiseData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/expertises?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        setMore(result.data[0]);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchExpertiseData();
  }, []);

  if (!more) {
    return <div>Loading...</div>;
  }
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <div className="content-frame flex flex-col bg-background dark:bg-background-dark text-text dark:text-text-dark ">
      <SectionHeader
        heading={more.heading}
        subheading={more.subheading}
        description={more.description[0].children[0].text}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {more?.expertises.map((item, index) => (
          <motion.div
            key={item.title + index}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
            className={`rounded-xl overflow-hidden 
              ${selectedId === index ? "ring-2 ring-primary ring-offset-2" : ""}
              bg-background-lighter dark:bg-background-lighter-dark border border-border dark:border-border-dark-mode
            `}
            onClick={() => setSelectedId(selectedId === index ? null : index)}
          >
            <div className="relative">
              {/* <div className="relative h-56 overflow-hidden">
                <Image
                  src={(item.i}
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-105"
                />
              </div> */}

              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-secondary-lighter  backdrop-blur-sm text-primary py-1 px-3 rounded-full text-xs font-medium ">
                Expertise
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-xl text-text-dark dark:text-text-dark mb-3 line-clamp-1">
                  {item.title}
                </h2>
                <span className="text-primary-dark dark:text-secondary-dark">
                  <FiArrowUpRight size={18} />
                </span>
              </div>

              <p className="text-text-light dark:text-light-text-dark text-sm mb-4 line-clamp-3">
                {item.description[0].children[0].text}
              </p>

              <div className="pt-4 border-t border-border-light dark:border-border-dark-mode flex justify-between items-center">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-text-light dark:text-dark-text-dark">
                  {item.level}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(MotionWrap(More, "app__about"), "more");
