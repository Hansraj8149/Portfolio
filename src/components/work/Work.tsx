import React from "react";
import {AppWrap} from "@/wrapper";
import {WorksProps} from "@/lib/models";
import SectionHeader from "../SectionHeader";
import GetSectionData from "../GetSectionData";
import WorkContent from "./WorkContent";
import Loader from "../Loader";

const Work = async () => {
  const data = await GetSectionData("works");
  const works: WorksProps = data?.data?.[0];
  if (!works) {
    return <Loader />;
  }
  return (
    <section id="work" className="w-full py-24 bg-background-light">
      <div className="content-frame flex-col items-center justify-center">
        <SectionHeader
          heading={works?.heading}
          subheading={works?.subHeading}
          description={works?.description}
        />

        <WorkContent filters={works?.filters?.skillTags} works={works?.works} />
      </div>
    </section>
  );
};

export default AppWrap(Work, "work", "bg-background-light");
