import React from "react";
import {AppWrap} from "@/wrapper";
import {WorksProps} from "@/lib/models";
import GetSectionData from "../GetSectionData";
import Loader from "../Loader";
import SectionHeader from "../SectionHeader";
import {StickyScroll} from "../ui/sticky-scroll-reveal";

const Work = async () => {
  const data = await GetSectionData("works");
  const works: WorksProps = data?.data?.[0];

  if (!works) {
    return <Loader />;
  }

  return (
    <section id="work" className="w-full py-24 bg-background-light">
      <SectionHeader
        heading={works?.heading || "My Work"}
        subheading={works?.subHeading || "Check out my latest projects"}
        description={works?.description || "Check out my latest projects"}
      />
      <StickyScroll works={works.works} />


    </section>
  );
};

export default AppWrap(Work, "work", "bg-background-light");