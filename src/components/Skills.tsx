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
      const expData = await client.fetch('*[_type == "experiences"]');
      const skillsData = await client.fetch('*[_type == "skills"]');
      setExperiences(expData);
      setSkills(skillsData);
    };

    fetchData();
  }, []);

  return (
    <section className="text-center py-16 bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        Skills & Experiences
      </h2>

      <div className="container mx-auto flex flex-col md:flex-row items-start justify-center gap-12">
        {/* Skills Section */}
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              key={skill.name}
              className="flex flex-col items-center space-y-2"
            >
              <div
                className="w-24 h-24 flex items-center justify-center rounded-full shadow-md"
                style={{ backgroundColor: skill.bgColor }}
              >
                <Image
                  src={urlFor(skill.icon).url()}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Section */}
        <div className="w-full max-w-2xl">
          {experiences.map((experience) => (
            <div key={experience.year} className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {experience.year}
              </h3>
              <motion.div className="space-y-4 mt-4">
                {experience.works.map((work) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    key={work.name}
                    className="p-4 bg-white rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-semibold text-gray-900">
                      {work.name}
                    </h4>
                    <p className="text-sm text-gray-600">{work.company}</p>
                    <p className="mt-2 text-gray-500 text-sm">{work.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "bg-gray-100"
);
