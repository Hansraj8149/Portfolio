"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Ripple } from "./magicui/ripple";

interface HeroData {
  id: number;
  title: string;
  heading: string;
  subheading: string;
  description: string;
  linkedinLink: string;
  githubLink: string;
  emailLink: string;
  twitterLink: string;
  leetcodeLink: string;
}

const Hero = () => {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/heroes`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        setData(result.data[0]);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="home"
      className="w-full h-screen text-center flex items-center justify-center bg-background dark:bg-background-dark"
    >
      <div className="max-w-[1240px] mx-auto px-4">
        <p className="uppercase text-sm tracking-widest text-text dark:text-light-text-dark">
          {data.title}
        </p>
        <h1 className="py-4 text-text dark:text-text-dark text-4xl font-bold">
          {data.heading}
        </h1>
        <h2 className="py-2 text-text dark:text-text-dark text-3xl font-semibold">
          {data.subheading}
        </h2>
        <p className="py-4 text-text-light dark:text-light-text-dark sm:max-w-[70%] mx-auto">
          {data.description}
        </p>

        <div className="flex items-center justify-center space-x-6 py-4">
          {data.linkedinLink && (
            <a href={data.linkedinLink} target="_blank" rel="noreferrer">
              <div className="rounded-full bg-secondary-lighter p-4 cursor-pointer hover:scale-110 ">
                <FaLinkedinIn className="w-6 h-6 text-primary-dark" />
              </div>
            </a>
          )}

          {data.githubLink && (
            <a href={data.githubLink} target="_blank" rel="noreferrer">
              <div className="rounded-full bg-secondary-lighter p-4 cursor-pointer hover:scale-110 ">
                <FaGithub className="w-6 h-6 text-primary-dark" />
              </div>
            </a>
          )}

          {data.emailLink && (
            <Link href={data.emailLink}>
              <div className="rounded-full bg-secondary-lighter p-4 cursor-pointer hover:scale-110 ">
                <EnvelopeIcon className="w-6 h-6 text-primary-dark" />
              </div>
            </Link>
          )}
        </div>
      </div>
      <Ripple />
    </div>
  );
};

export default Hero;
