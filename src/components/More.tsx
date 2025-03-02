"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import { client, urlFor } from "../sanity/lib/client";

const More = () => {
  interface MoreItem {
    title: string;
    description: string;
    imgUrl: string;
  }

  const [more, setMore] = useState<MoreItem[]>([]);

  useEffect(() => {
    const query = '*[_type == "more"]';

    client.fetch(query).then((data) => {
      setMore(data);
    });
  }, []);

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center leading-tight mb-8">
        <span className="text-blue-600">Design </span> &{" "}
        <span className="text-green-600">Development</span> Skills Together
        <br /> makes a Great <span className="text-red-600">Developer</span>
      </h2>

      <div className="flex flex-wrap justify-center items-start gap-6">
        {more.map((item, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="w-64 md:w-72 bg-white text-black shadow-md rounded-lg p-4 cursor-pointer transition-all"
            key={item.title + index}
          >
            {/* Uncomment Next.js Image for optimization */}
            <Image
              src={urlFor(item.imgUrl).url()}
              alt={item.title}
              width={270}
              height={170}
              className="w-full h-44 rounded-lg object-cover"
            />
            <h2 className="font-bold text-xl mt-5">{item.title}</h2>
            <p className="text-gray-600 mt-3">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(More, "app__about"), "more", "bg-gray-100");
