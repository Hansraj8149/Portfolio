import React from "react";
import {WorksProps} from "@/lib/models";
import GetSectionData from "../GetSectionData";
import Loader from "../Loader";
import WorkClientSide from "./WorkClientSide";

const Work = async () => {
  const data = await GetSectionData("works");
  const worksData: WorksProps = data?.data?.[0];

  if (!worksData) {
    return <Loader />;
  }

  return (
    <WorkClientSide worksData={worksData} />

  );
};

export default Work