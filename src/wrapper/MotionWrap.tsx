"use client";
import React, { ComponentType } from "react";
import { motion } from "framer-motion";

const MotionWrap = <P extends object>(
  Component: ComponentType<P>,
  classNames?: string
) => {
  return function HOC(props: P) {
    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={`${classNames} flex justify-center items-center`}
      >
        <Component {...props} />
      </motion.div>
    );
  };
};

export default MotionWrap;
