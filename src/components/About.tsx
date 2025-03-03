"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { FiAward, FiCode } from "react-icons/fi";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const About = () => {
  return (
    <div
      id="about"
      className="w-full min-h-screen bg-background dark:bg-background-dark py-20 content-frame"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary-dark text-sm font-bold uppercase mb-4">
            About Me
          </span>
          <h2 className="text-3xl font-semibold text-text dark:text-text-dark font-mulish mb-6">
            Bringing Ideas to Life with Scalable Solutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-light-text dark:text-light-text-dark mb-3">
                Hi, I&apos;m{" "}
                <span className="text-primary-dark border-b-2 border-primary pb-1">
                  Hansraj Saini
                </span>
              </h3>
              <p className="text-light-text dark:text-light-text-dark leading-relaxed mb-6">
                A results-driven Full-Stack Developer with expertise in React
                Native, Next.js, and backend technologies like Express.js and
                PostgreSQL. I specialize in crafting scalable, high-performance
                applications that drive user engagement and business growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkillCard
                icon={
                  <HiOutlineLightBulb
                    className="text-primary-dark "
                    size={24}
                  />
                }
                title="Mobile Development"
                description="Built a cross-platform mobile app, reducing load times by 40% and improving overall performance."
                delay={0.3}
              />
              <SkillCard
                icon={
                  <RiCodeSSlashLine className="text-primary-dark " size={24} />
                }
                title="API Development"
                description="Led API development and optimized real-time data processing, cutting latency by 20%."
                delay={0.4}
              />
              <SkillCard
                icon={<FiAward className="text-primary-dark" size={24} />}
                title="Problem Solving"
                description="Strong problem-solving skills with 500+ LeetCode problems solved and a 5-star C++ rating on HackerRank."
                delay={0.5}
              />
              <SkillCard
                icon={<FiCode className="text-primary-dark " size={24} />}
                title="Clean Code"
                description="Passionate about clean, scalable code and delivering seamless user experiences."
                delay={0.6}
              />
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8"
            >
              <Link href="/#work">
                <button className="flex px-4 bg-primary text-secondary-lighter py-2 rounded-lg font-medium transition-all duration-300 hover:bg-primary-darker ">
                  See My Portfolio <BsArrowRightShort size={24} />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Section - 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 flex justify-center"
          >
            <CardContainer className="inter-var">
              <CardBody className="relative group/card bg-background-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode w-full h-auto rounded-2xl p-6  transition-all duration-300">
                <CardItem
                  translateZ={50}
                  className="text-xl font-bold text-dark-text dark:text-text-dark mb-2 z-10"
                >
                  Full Stack Developer
                </CardItem>

                <CardItem
                  as="div"
                  translateZ={60}
                  className="text-sm text-primary-dark dark:text-primary-light font-medium mb-4 z-10"
                >
                  Crafting digital experiences
                </CardItem>

                <CardItem translateZ={100} className="w-full h-auto z-10">
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                    <Image
                      src="/about.jpeg"
                      alt="Hansraj Saini - Full Stack Developer"
                      fill
                      className="object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60"></div>
                  </div>
                </CardItem>

                <CardItem
                  translateZ={80}
                  rotateX={10}
                  rotateZ={-10}
                  className="mt-4 z-10"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      React Native
                    </span>
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                      Next.js
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                      Express.js
                    </span>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Skill Card Component
interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-background-lighter dark:bg-background-light-dark p-5 rounded-xl  border border-border-light dark:border-border-dark-mode transition-all duration-300"
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-secondary-light rounded-lg">{icon}</div>
        <div>
          <h4 className="font-semibold text-text dark:text-text-dark mb-1">
            {title}
          </h4>
          <p className="text-light-text dark:text-light-text-dark text-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AppWrap(MotionWrap(About, "about"), "about");
