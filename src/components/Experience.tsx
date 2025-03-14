"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExperienceProps } from "@/lib/models";
import SectionHeader from "./SectionHeader";

const Experience = () => {
  const [data, setData] = useState<ExperienceProps | null>(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/experiences`,
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
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative border-l-2 border-primary dark:border-primary-light pl-6 ml-4"
        >
          {data.experiences.map((experience, index) => (
            <div key={experience.id} className="mb-12">
              <div className="absolute w-4 h-4 bg-primary dark:bg-primary-light rounded-full -left-3 mt-1.5"></div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="mb-2"
              >
                <span className="bg-primary text-secondary-lighter px-4 py-1 rounded-full text-sm font-semibold">
                  {experience.fromDate} - {experience.toDate}
                </span>
              </motion.div>

              <div className="p-5 bg-secondary-lighter dark:bg-background-light-dark rounded-lg space-y-3">
                <h4 className="text-xl font-semibold text-text dark:text-background">
                  {experience.role}
                </h4>
                <p className="text-primary-dark dark:text-secondary-light font-medium">
                  {experience.company} - {experience.location}
                </p>

                {experience.technologies && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary text-secondary-lighter px-3 py-1 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {experience.description && (
                  <ul className="mt-3 space-y-2 text-light-text dark:text-light-text-dark list-disc list-inside">
                    {experience.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
