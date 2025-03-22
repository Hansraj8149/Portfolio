import React from "react";
import {ExperienceProps} from "@/lib/models";
import SectionHeader from "../SectionHeader";
import GetSectionData from "../GetSectionData";
import Loader from "../Loader";
import {AppWrap} from "@/wrapper";
import {Timeline} from "./timeline";

const Experience = async () => {
  const data = await GetSectionData("experiences");
  const experiences: ExperienceProps = data?.data?.[0];

  if (!experiences) {
    return <Loader />;
  }

  return (
    <section className="py-24 w-full">
      <div className="content-frame bg-background flex-col">
        <SectionHeader
          heading={experiences.heading}
          subheading={experiences.subheading}
          description={experiences?.description[0]?.children[0]?.text}
        />

        <div className="relative">
          {experiences.experiences && (
            <Timeline experiences={experiences?.experiences} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AppWrap(Experience, "experience");
