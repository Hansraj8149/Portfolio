"use client";
import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import { urlFor, client } from "@/sanity/lib/client";
import Image from "next/image";

const Work = () => {
  interface WorkType {
    imgUrl: string;
    name: string;
    projectLink: string;
    codeLink: string;
    title: string;
    description: string;
    tags: string[];
  }

  const [works, setWorks] = useState<WorkType[]>([]);
  const [filterWork, setFilterWork] = useState<WorkType[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      setFilterWork(
        item === "All"
          ? works
          : works.filter((work) => work.tags.includes(item))
      );
    }, 500);
  };

  return (
    <div className=" h-auto flex-col flex items-center content-frame">
      <h2 className="text-4xl font-bold text-center my-6">
        My Creative <span className="text-blue-500">Portfolio</span> Section
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center my-6">
        {["UI/UX", "Node JS", "Next JS", "React JS", "All"].map(
          (item, index) => (
            <button
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`px-4 py-2 m-2 rounded-lg font-semibold transition-all ${
                activeFilter === item
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-blue-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Work Portfolio */}
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        {filterWork.map((work, index) => (
          <div
            key={index}
            className="group relative  rounded-lg shadow-lg p-4 hover:shadow-2xl transition-all"
          >
            <Image
              src={urlFor(work.imgUrl).url()}
              alt={work.name || "Project Image"}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-4 transition-all">
              <a href={work.projectLink} target="_blank" rel="noreferrer">
                <motion.div
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 0.9] }}
                  transition={{ duration: 0.25 }}
                  className="w-12 h-12 flex items-center justify-center bg-black bg-opacity-60 text-white rounded-full cursor-pointer"
                >
                  <AiFillEye size={24} />
                </motion.div>
              </a>
              <a href={work.codeLink} target="_blank" rel="noreferrer">
                <motion.div
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 0.9] }}
                  transition={{ duration: 0.25 }}
                  className="w-12 h-12 flex items-center justify-center bg-black bg-opacity-60 text-white rounded-full cursor-pointer"
                >
                  <AiFillGithub size={24} />
                </motion.div>
              </a>
            </div>
            <div className="mt-4 text-center">
              <h4 className="text-xl font-semibold">{work.title}</h4>
              <p className="text-gray-600 mt-2">{work.description}</p>
              <div className="absolute top-0 left-4  text-gray-700 px-3 py-1 rounded-md text-sm font-semibold shadow-md">
                {work.tags[0]}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(MotionWrap(Work, "work"), "work", "bg-gray-100");
