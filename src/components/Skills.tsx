"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SkillsProps } from "@/lib/models";
import SectionHeader from "./SectionHeader";

const Skills = () => {
  const [data, setData] = useState<SkillsProps | null>(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/skills`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        setData(result.data[0]);
      } catch (error) {
        console.error("Error fetching experience data:", error);
      }
    };

    fetchExperienceData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-20 content-frame">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading={data.heading}
          subheading={data.subheading}
          description={data.description}
        />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-6"
        >
          {data?.skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              key={skill?.skill}
              className="flex flex-col items-center"
            >
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center dark:bg-background-light-dark mb-3 duration-300"
                style={{ backgroundColor: "#ffffff" }}
              >
                {/* <Image
                  src={urlFor(skill.icon).url()}
                  alt={skill.name}
                  width={36}
                  height={36}
                  className="object-contain"
                /> */}
              </div>
              <p className="font-medium text-light-text dark:text-light-text-dark">
                {skill.skill}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
