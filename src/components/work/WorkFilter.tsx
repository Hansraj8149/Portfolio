import React from "react";
import clsx from "clsx";

interface WorkFiltersProps {
  filters: string[];
  activeFilter: string;
  handleWorkFilter: (tag: string) => void;
}

const WorkFilters: React.FC<WorkFiltersProps> = ({
  filters,
  activeFilter,
  handleWorkFilter,
}) => {
  return (
    <div className="flex flex-wrap justify-center mb-12 gap-3">
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => handleWorkFilter(filter)}
          className={clsx(
            "px-5 py-2 rounded-full font-medium text-sm transform hover:scale-105",
            activeFilter === filter
              ? "bg-primary text-secondary-lighter dark:bg-primary-dark"
              : "bg-secondary-lighter text-text border border-border hover:border-primary hover:text-primary dark:border-border-dark-mode"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default WorkFilters;
