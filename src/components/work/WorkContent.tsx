"use client";
import React, { useState, useMemo } from "react";
import WorkCard from "./WorkCard";
import { SkillTagsProps, WorkType } from "@/lib/models";
import WorkFilters from "./WorkFillters";

interface WorkContentProps {
  filters: SkillTagsProps[];
  works: WorkType[];
}

const WorkContent = ({ filters, works }: WorkContentProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredWorks = useMemo(() => {
    return activeFilter === "All"
      ? works
      : works.filter((work) =>
          work.workTags?.some((workTag) => workTag.tag === activeFilter)
        );
  }, [activeFilter, works]);

  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="flex flex-wrap justify-center mb-12 gap-3">
        <WorkFilters filters={filters} onClick={setActiveFilter} />
      </div>
      <div className="w-full gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {filteredWorks.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </div>
  );
};

export default WorkContent;
