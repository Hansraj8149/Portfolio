import React from "react";
import { AppWrap } from "@/wrapper";
import { WorksProps } from "@/lib/models";
import SectionHeader from "../SectionHeader";
import GetSectionData from "../GetSectionData";
import WorkContent from "./WorkContent";

const Work = async () => {
  const data = await GetSectionData("works");
  const works: WorksProps = data?.data?.[0];

  return (
    <section id="work" className="w-full py-36 bg-background-light">
      <div className="content-frame flex-col items-center justify-center">
        <SectionHeader
          heading="My Creative Portfolio"
          subheading="Showcasing my work"
          description="Here are some of my featured projects."
        />

        <WorkContent filters={works?.filters?.skillTags} works={works.works} />
      </div>
    </section>
  );
};

export default AppWrap(Work, "work", "bg-background-light");
