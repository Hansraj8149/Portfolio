import React from "react";

interface NavigationDotsProps {
  active: string;
}

const NavigationDots = ({ active }: NavigationDotsProps) => {
  const sections = ["home", "work", "about", "more", "skills", "contact"];

  return (
    <div className="md:flex lg:flex flex-col items-center justify-center px-3 gap-3 hidden">
      {sections.map((item) => (
        <a
          key={item}
          href={`#${item}`}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            active === item ? "bg-primary" : "bg-secondary"
          } hover:bg-primary`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;
