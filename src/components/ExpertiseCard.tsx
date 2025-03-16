"use client";
import { Expertise } from "@/lib/models";
import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

const ExpertiseCards = ({ expertises }: { expertises: Expertise[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {expertises?.map((item, index) => (
        <motion.div
          key={item.id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="rounded-2xl overflow-hidden bg-background 
            border border-gray-800 shadow-sm hover:shadow-md
            transition-all duration-300 flex flex-col"
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded bg-primary/20 text-primary-light">
                Expertise
              </span>

              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-background-light 
                  text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                whileHover={{ rotate: 45 }}
              >
                <FiArrowUpRight size={16} />
              </motion.div>
            </div>

            <h2 className="font-bold text-xl text-text-secondary mb-3 line-clamp-1">
              {item.title}
            </h2>

            <p className="text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">
              {item.description?.[0]?.children?.[0]?.text ?? ""}
            </p>

            <div className="pt-4 border-t border-gray-800 flex justify-between items-center mt-auto">
              <div className="flex">
                {[...Array(5)].map((_, star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star < (item.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-700"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-background-lighter text-gray-300">
                {item.level}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExpertiseCards;
