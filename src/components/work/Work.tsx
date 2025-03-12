"use client";
import React, { useState, useEffect, useRef } from "react";
import { AppWrap, MotionWrap } from "@/wrapper";
import { WorksProps, WorkType } from "@/lib/models";
import WorkFilters from "./WorkFilter";
import SectionHeader from "../SectionHeader";
import WorkCard from "./WorkCard";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [works, setWorks] = useState<WorkType[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<WorkType[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/works?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        const workData: WorksProps = result.data[0];

        setWorks(workData.works);
        setFilteredWorks(workData.works);
        setFilters([
          "All",
          ...workData?.filters?.flatMap((filter) =>
            filter.skillTags.map((tag) => tag.tag)
          ),
        ]);
      } catch (error) {
        console.error("Error fetching work data:", error);
      }
    };

    fetchWorkData();
  }, []);

  const handleWorkFilter = (tag: string) => {
    setActiveFilter(tag);
    setFilteredWorks(
      tag === "All"
        ? works
        : works?.filter((work) =>
            work?.workTags?.some((workTag) => workTag.tag === tag)
          )
    );
  };

  return (
    <div className="flex flex-col items-center content-frame bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <SectionHeader
        heading="My Creative Portfolio"
        subheading="Showcasing my work"
        description="Here are some of my featured projects."
      />

      <WorkFilters
        filters={filters}
        activeFilter={activeFilter}
        handleWorkFilter={handleWorkFilter}
      />

      <div
        className="inset-0 z-10 relative min-h-screen w-full place-content-center overflow-hidden"
        ref={containerRef}
      >
        {filteredWorks.map((work) => (
          <WorkCard key={work.id} containerRef={containerRef} work={work} />
        ))}
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Work, "work"), "work");
