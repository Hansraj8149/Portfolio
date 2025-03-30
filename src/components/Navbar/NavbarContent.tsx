"use client";
import {useState, useEffect} from "react";
import {HiOutlineMenuAlt1, HiXCircle, HiBriefcase} from "react-icons/hi";
import {NavbarProps} from "@/lib/models";
import Logo from "../Logo";
import SpotlightButton from "../SpotlightButton";
import NavLinks from "./NavLinks";
import {clsx} from "clsx";
import {motion, AnimatePresence} from "framer-motion";

const NavbarContent = ({navbars}: {navbars: NavbarProps}) => {
  const {navbarLinks, primaryButtonLink, primaryButtonText} = navbars;

  const links = navbarLinks?.map((link: {name: string; link: string}) => ({
    title: link?.name,
    href: link?.link,
  }));

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu if screen size is md or larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMobileNavClick = (href: string) => {
    const sectionId = href.substring(1); // Remove the '#' from href
    const element = document.getElementById(sectionId);

    if (element) {
      setMobileMenuOpen(false);
      setTimeout(() => {
        element.scrollIntoView({behavior: "smooth"});
      }, 300);
    }
  };

  return (
    <div className="flex content-frame">
      <motion.header
        className={clsx(
          "fixed top-6 left-1/2 z-50",
          scrolled
            ? "py-2 border border-border backdrop-blur-3xl bg-background/30 rounded-full px-4"
            : "border-none"
        )}
        initial={{width: "80%", x: "-50%"}}
        animate={{
          width: scrolled ? "65%" : "80%",
          x: "-50%",
        }}
        transition={{
          width: {type: "tween", stiffness: 300, damping: 30},
          backgroundColor: {duration: 0.5},
          backdropFilter: {duration: 0.5},
        }}
      >
        <nav className="flex items-center justify-between w-full">
          <Logo />
          <div className="md:block hidden">
            <NavLinks links={links} />
          </div>
          <div className="md:block hidden">
            {primaryButtonLink && (
              <SpotlightButton
                text={primaryButtonText}
                link={primaryButtonLink}
                target="_blank"
                variant="primary"
                icon={<HiBriefcase className="h-full w-full text-primary" />}
              />
            )}
          </div>
          <button
            className="md:hidden text-[var(--color-text-secondary)]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt1 size={24} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed inset-x-4 bottom-4 bg-background rounded-2xl p-6 z-50 "
              initial={{y: "100%", opacity: 0}}
              animate={{y: 0, opacity: 1}}
              exit={{y: "100%", opacity: 0}}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
            >
              <div className="flex justify-between items-center mb-4 pb-4">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <HiXCircle size={38} />
                </button>
              </div>

              <div className="flex flex-col">
                {links.map((link, index) => (
                  <motion.div
                    key={link.title}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.05, duration: 0.3}}
                  >
                    <button
                      className={clsx(
                        "text-sm font-medium w-full text-left py-3 px-5 transition-all border border-border",
                        index === 0 ? "rounded-t-md" : "border-t",
                        index === links.length - 1
                          ? "rounded-b-md"
                          : "border-b-0"
                      )}
                      onClick={() => handleMobileNavClick(link.href)}
                    >
                      {link.title}
                    </button>
                  </motion.div>
                ))}

                {primaryButtonLink && (
                  <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: links.length * 0.05, duration: 0.3}}
                    className="mt-8"
                  >
                    <SpotlightButton variant="primary" className="w-full">
                      <button
                        type="submit"
                        onClick={() => window.open(primaryButtonLink, "_blank")}
                        className={clsx(
                          "relative z-10 flex items-center justify-center gap-2 rounded bg-background px-6 py-2 ring-1 ring-primary/20 w-full"
                        )}
                      >
                        <span className="text-lg font-semibold tracking-wide text-primary">
                          {primaryButtonText}
                        </span>
                        <HiBriefcase className="h-6 w-6 text-primary" />
                      </button>
                    </SpotlightButton>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarContent;
