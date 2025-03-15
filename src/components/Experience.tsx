import React from "react";
import { ExperienceProps } from "@/lib/models";
import SectionHeader from "./SectionHeader";
import GetSectionData from "./GetSectionData";

const Experience = async () => {
  const data = await GetSectionData("experiences");
  const experiences: ExperienceProps = data?.data?.[0];

  if (!experiences) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-20 content-frame">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading={experiences.heading}
          subheading={experiences.subheading}
          description={experiences?.description[0]?.children[0]?.text}
        />

        <div className="relative border-l-2 border-primary dark:border-primary-light pl-6 ml-4">
          {experiences.experiences.map((experience) => (
            <div key={experience.id} className="mb-12">
              <div className="absolute w-4 h-4 bg-primary dark:bg-primary-light rounded-full -left-3 mt-1.5"></div>

              <div className="mb-2">
                <span className="bg-primary text-secondary-lighter px-4 py-1 rounded-full text-sm font-semibold">
                  {experience.fromDate} - {experience.toDate}
                </span>
              </div>

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
                      <li key={i}>
                        {desc.children.map((child) => child.text).join(" ")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
