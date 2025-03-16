"use client";
import React, { JSX } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { HiHome, HiBriefcase, HiUser } from "react-icons/hi";
import { FaTools, FaArrowRight } from "react-icons/fa";
import { BiHistory } from "react-icons/bi";
import { NavbarProps } from "@/lib/models";
import Button from "../Button";
import Logo from "../Logo";

const ICONS_MAP: Record<string, JSX.Element> = {
  Home: <HiHome className="h-full w-full text-text-secondary" />,
  Work: <HiBriefcase className="h-full w-full text-text-secondary" />,
  About: <HiUser className="h-full w-full text-text-secondary" />,
  Skills: <FaTools className="h-full w-full text-text-secondary" />,
  Experience: <BiHistory className="h-full w-full text-text-secondary" />,
};

const NavbarContent = ({ navbars }: { navbars: NavbarProps }) => {
  const { navbarLinks, primaryButtonLink, primaryButtonText } = navbars;

  const links = navbarLinks.map((link: { name: string; link: string }) => ({
    title: link.name,
    icon: ICONS_MAP[link.name],
    href: link.link,
  }));

  return (
    <nav className="fixed z-50 w-full backdrop-blur-2xl bg-background-lighter/20 ">
      <div className="content-frame flex items-center justify-between w-full py-2">
        <Logo />
        <FloatingDock mobileClassName="translate-y-0" items={links} />
        {primaryButtonLink && (
          <Button
            text={primaryButtonText}
            link={primaryButtonLink}
            target="_blank"
            icon={<FaArrowRight className="z-20 lg:size-4 md:size-4 size-3" />}
          />
        )}
      </div>
    </nav>
  );
};

export default NavbarContent;
