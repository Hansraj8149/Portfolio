"use client";
import React, { JSX } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBriefcase,
  IconHistory,
  IconHome,
  IconSettings,
  IconUser,
  IconArrowRight,
} from "@tabler/icons-react";
import Image from "next/image";
import { NavbarProps } from "@/lib/models";
import Button from "../Button";
import Logo from "../Logo";

const ICONS_MAP: Record<string, JSX.Element> = {
  Home: (
    <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  ),
  Work: (
    <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  ),
  About: (
    <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  ),
  Skills: (
    <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  ),
  Experience: (
    <IconHistory className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  ),
};

const NavbarContent = ({ navbars }: { navbars: NavbarProps }) => {
  const { navbarLinks, primaryButtonLink, primaryButtonText } = navbars;

  const links = navbarLinks.map((link: { name: string; link: string }) => ({
    title: link.name,
    icon: ICONS_MAP[link.name] || (
      <Image
        src="https://assets.aceternity.com/logo-dark.png"
        width={20}
        height={20}
        alt={link.name}
      />
    ),
    href: link.link,
  }));

  return (
    <nav className="fixed z-50 w-full">
      <div className="content-frame flex items-center justify-between w-full">
        <Logo />
        <FloatingDock mobileClassName="translate-y-0" items={links} />
        {primaryButtonLink && (
          <Button
            text={primaryButtonText}
            link={primaryButtonLink}
            target="_blank"
            icon={
              <IconArrowRight className="z-20 lg:size-6 md:size-6 size-4" />
            }
          />
        )}
      </div>
    </nav>
  );
};

export default NavbarContent;
