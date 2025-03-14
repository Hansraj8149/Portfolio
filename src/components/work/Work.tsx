import React from "react";
import { AppWrap } from "@/wrapper";
import { WorksProps } from "@/lib/models";
import WorkFilters from "./WorkFilter";
import SectionHeader from "../SectionHeader";
import GetSectionData from "../GetSectionData";

const Work = async () => {
  const data = await GetSectionData("works");
  const works: WorksProps = data?.data?.[0];

  return (
    <div className="flex flex-col items-center content-frame bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <SectionHeader
        heading="My Creative Portfolio"
        subheading="Showcasing my work"
        description="Here are some of my featured projects."
      />

      <WorkFilters filters={works?.filters?.skillTags} works={works.works} />
    </div>
  );
};

export default AppWrap(Work, "work");
