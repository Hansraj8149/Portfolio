import React from "react";
import {WorksProps} from "@/lib/models";
import GetSectionData from "../GetSectionData";
import Loader from "../Loader";
import WorkClientSide from "./WorkClientSide";

const Work = async () => {
  const data = await GetSectionData("works");
  if (!data || !data.length) {
    return <Loader />;
  }
  const worksData: WorksProps = data?.data?.[0];


  return (
    <WorkClientSide worksData={worksData} />

  );
};

export default Work