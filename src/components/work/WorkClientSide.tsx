"use client"
import React, {useRef, useState} from "react";
import {WorksProps} from "@/lib/models";

import {StickyScroll} from "./sticky-scroll-reveal";
import SectionHeader from "../SectionHeader";
import {useMotionValueEvent, useScroll, motion} from "motion/react";



const WorkClientSide = ({worksData}: {worksData: WorksProps}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = worksData.works.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = worksData.works.map((_, index) => index / cardLength);
    const closestIndex = breakpoints.reduce((acc, point, index) => {
      return Math.abs(latest - point) < Math.abs(latest - breakpoints[acc]) ? index : acc;
    }, 0);
    setActiveCard(closestIndex);
  });
  const backgroundColors = [
    "#0d1117", // Deep black with a hint of blue
    "#000000", // Pure black
    "#181818", // Soft black with a slight warm tint
    "#1a1a1a", // Dark neutral gray-black
    "#101418", // Deep charcoal with a blue undertone
    "#121212", // True dark mode black
  ];

  return (
    <motion.div

      animate={{backgroundColor: backgroundColors[activeCard % backgroundColors.length]}}
      id="work" className="w-full py-24 flex flex-col gap-12">
      <SectionHeader
        heading={worksData?.heading || "My Work"}
        subheading={worksData?.subHeading || "Check out my latest projects"}
        description={worksData?.description || "Check out my latest projects"}
      />
      <StickyScroll works={worksData?.works} activeCard={activeCard} ref={ref} />


    </motion.div>
  );





};

export default WorkClientSide;