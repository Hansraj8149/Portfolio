"use client";
import {useState, useEffect, useRef} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import clsx from "clsx";

interface LinkItem {
  title: string;
  href: string;
}

const NavLinks = ({links}: {links: LinkItem[]}) => {
  const [activeSection, setActiveSection] = useState("home");
  const [dimensions, setDimensions] = useState({width: 0, left: 0});
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "home";

      links.forEach((link) => {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  useEffect(() => {
    const activeIndex = links.findIndex((link) => link.href.substring(1) === activeSection);
    if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
      const linkElement = linkRefs.current[activeIndex];
      if (linkElement) {
        const {width, left} = linkElement.getBoundingClientRect();
        const containerLeft = linkRefs.current[0]?.parentElement?.getBoundingClientRect().left || 0;

        setDimensions({
          width: width,
          left: left - containerLeft,
        });
      }
    }
  }, [activeSection, links]);

  return (
    <div className="hidden md:flex items-center relative">
      {/* Animated Background */}
      <motion.div
        className="absolute p-4 bg-text/10 backdrop-blur-3xl rounded-2xl -z-10"
        initial={false}
        animate={{
          width: dimensions.width,
          left: dimensions.left,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      />

      {links.map((link, index) => (
        <Link
          key={link.title}
          ref={(el) => {
            linkRefs.current[index] = el;
          }}
          href={link.href}
          className={clsx(
            "relative p-4 transition-all duration-300 z-10 rounded-lg text-sm font-medium",
            activeSection === link.href.substring(1) ? "text-text font-bold" : "text-text-secondary hover:text-text"
          )}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(link.href.substring(1))?.scrollIntoView({behavior: "smooth"});
          }}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
