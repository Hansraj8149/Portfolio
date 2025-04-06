import React from "react";
import {WorksProps} from "@/lib/models";
import {getSectionData} from "@/utils/utils";
import Loader from "../Loader";
import WorkClientSide from "./WorkClientSide";

const Work = async () => {
  const data = await getSectionData("works");

  const worksData: WorksProps = data?.data?.length ? data.data[0] : null;

  if (!worksData) {
    return <Loader />;
  }

  return (
    <WorkClientSide worksData={worksData} />

  );
};

export default Work