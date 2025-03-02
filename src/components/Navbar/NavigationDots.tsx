import React from "react";

interface NavigationDotsProps {
  active: string;
}

const NavigationDots = ({ active }: NavigationDotsProps) => {
  const sections = ["home", "work", "about", "more", "skills", "contact"];

  return (
    <div className="flex flex-col items-center justify-center px-4 gap-4">
      {sections.map((item) => (
        <a
          key={item}
          href={`#${item}`}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            active === item ? "bg-blue-600" : "bg-gray-300"
          } hover:bg-blue-500`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;
