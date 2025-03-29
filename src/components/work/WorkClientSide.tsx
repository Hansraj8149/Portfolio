"use client"
import {WorksProps} from "@/lib/models";
import WorkCard from "./WorkCard";
import SectionHeader from "../SectionHeader";
import Loader from "../Loader";



const WorkClientSide = ({works}: {works: WorksProps}) => {

  const projects = works?.works || [];





  if (!works) {
    return <Loader />;
  }

  return (
   
  );
};

export default WorkClientSide;