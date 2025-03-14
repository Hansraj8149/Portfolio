"use client";
import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import WorkCard from "./WorkCard";
import { SkillTagsProps, WorkType } from "@/lib/models";

interface WorkFiltersProps {
  filters: SkillTagsProps[];
  works: WorkType[];
}

const WorkFilters = ({ filters, works }: WorkFiltersProps) => {
  const [filteredWorks, setFilteredWorks] = useState<WorkType[]>(works);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setFilteredWorks(works);
  }, [works]);

  const handleWorkFilter = (tag: string) => {
    setActiveFilter(tag);
    setFilteredWorks(
      tag === "All"
        ? works
        : works.filter((work) =>
            work.workTags?.some((workTag) => workTag.tag === tag)
          )
    );
  };

  return (
    <>
      <div className="flex flex-wrap justify-center mb-12 gap-3">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleWorkFilter(filter.tag)}
            className={clsx(
              "px-5 py-2 rounded-full font-medium text-sm transform hover:scale-105",
              activeFilter === filter.tag
                ? "bg-primary text-secondary-lighter dark:bg-primary-dark"
                : "bg-secondary-lighter text-text border border-border hover:border-primary hover:text-primary dark:border-border-dark-mode"
            )}
          >
            {filter.tag}
          </button>
        ))}
      </div>
      <div
        className="inset-0 z-10 relative min-h-screen w-full place-content-center overflow-hidden"
        ref={containerRef}
      >
        {filteredWorks.map((work) => (
          <WorkCard key={work.id} containerRef={containerRef} work={work} />
        ))}
      </div>
    </>
  );
};

export default WorkFilters;
