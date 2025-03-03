"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import { urlFor, client } from "@/sanity/lib/client";

interface Experience {
  year: string;
  works: {
    name: string;
    company: string;
    desc: string;
  }[];
}

interface Skill {
  name: string;
  bgColor: string;
  icon: string;
}

const Skills = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const expData = await client.fetch(
        '*[_type == "experiences"] | order(year desc)'
      );
      const skillsData = await client.fetch('*[_type == "skills"]');
      setExperiences(expData);
      setSkills(skillsData);
    };

    fetchData();
  }, []);
  console.log(skills);
  return (
    <section className="py-20 transition-colors content-frame flex flex-col">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-4">
            Skills &{" "}
            <span className="text-primary dark:text-primary-light">
              Experiences
            </span>
          </h2>
          <p className="text-light-text dark:text-light-text-dark max-w-2xl mx-auto">
            My professional journey and technical expertise that I bring to
            every project
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Skills Section */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/5"
          >
            <h3 className="text-2xl font-bold mb-8 text-text dark:text-text-dark border-b-2 border-primary dark:border-primary-light inline-block pb-2">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center dark:bg-background-light-dark mb-3  duration-300"
                    style={{ backgroundColor: skill.bgColor || "#ffffff" }}
                  >
                    <Image
                      src={urlFor(skill.icon).url()}
                      alt={skill.name}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <p className="font-medium text-light-text dark:text-light-text-dark">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:w-3/5"
          >
            <h3 className="text-2xl font-bold mb-8 text-text dark:text-text-dark border-b-2 border-primary dark:border-primary-light inline-block pb-2">
              Work Experience
            </h3>
            <div className="relative border-l-2 border-primary dark:border-primary-light pl-6 ml-4">
              {experiences.map((experience, index) => (
                <div key={experience.year} className="mb-12">
                  <div className="absolute w-4 h-4 bg-primary dark:bg-primary-light rounded-full -left-3 mt-1.5"></div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="mb-2"
                  >
                    <span className="bg-primary dark:bg-primary-light text-text dark:text-text-dark px-4 py-1 rounded-full text-sm font-semibold">
                      {experience.year}
                    </span>
                  </motion.div>

                  <div className="space-y-6 mt-4">
                    {experience.works.map((work, workIndex) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + workIndex * 0.05,
                        }}
                        key={work.name}
                        className="p-5 bg-secondary-lighter dark:bg-background-light-dark rounded-lg transition-all duration-300"
                      >
                        <h4 className="text-xl font-semibold text-text dark:text-background">
                          {work.name}
                        </h4>
                        <p className="text-primary-dark dark:text-secondary-light font-medium mt-1">
                          {work.company}
                        </p>
                        <p className="mt-3 text-light-text dark:text-light-text-dark leading-relaxed">
                          {work.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppWrap(MotionWrap(Skills, "app__skills"), "skills");
