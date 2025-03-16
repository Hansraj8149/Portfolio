"use client";
import { SkillTagsProps } from "@/lib/models";
import React, { useState } from "react";

interface WorkFiltersProps {
  filters: SkillTagsProps[];
  onClick: (tag: string) => void;
}

const WorkFilters = ({ filters, onClick }: WorkFiltersProps) => {
  const [activeTag, setActiveTag] = useState<string>("All");

  const handleClick = (tag: string) => {
    setActiveTag(tag);
    onClick(tag);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 pt-4 md:px-8">
      <div className="mt-6 flex justify-center">
        <ul className="flex flex-wrap items-center justify-center gap-3 overflow-x-auto border-b border-text-secondary px-2 py-2">
          {filters.map((item) => (
            <li key={item.tag}>
              <button
                onClick={() => handleClick(item.tag)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                  ${
                    activeTag === item.tag
                      ? "bg-primary text-white shadow-md"
                      : "text-text-secondary bg-background"
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-50
                `}
              >
                {item.tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkFilters;
