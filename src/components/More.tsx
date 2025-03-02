"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import { client, urlFor } from "../sanity/lib/client";
import { FiArrowUpRight } from "react-icons/fi";

interface MoreItem {
  title: string;
  description: string;
  imgUrl: string;
}

const More = () => {
  const [more, setMore] = useState<MoreItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const query = '*[_type == "more"]';
    client.fetch(query).then((data) => {
      setMore(data);
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-bold text-sm uppercase tracking-wider">
          My Expertise
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-6 leading-tight">
          Where <span className="text-blue-600">Design</span> Meets{" "}
          <span className="text-green-600">Development</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Combining aesthetic design principles with solid development practices
          creates seamless digital experiences that are both beautiful and
          functional.
        </p>

        <div className="flex justify-center mt-8">
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {more.map((item, index) => (
          <motion.div
            key={item.title + index}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
            className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300
              ${selectedId === index ? "ring-2 ring-blue-500 ring-offset-2" : ""}
            `}
            onClick={() => setSelectedId(selectedId === index ? null : index)}
          >
            <div className="relative">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={urlFor(item.imgUrl).url()}
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-600 py-1 px-3 rounded-full text-xs font-medium shadow-sm">
                Expertise
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-xl text-gray-800 mb-3 line-clamp-1">
                  {item.title}
                </h2>
                <span className="text-blue-500">
                  <FiArrowUpRight size={18} />
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">Advanced</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(MotionWrap(More, "app__about"), "more");
