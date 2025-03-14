import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface PhotoCardProps {
  heading: string;
  subheading: string;
}

const PhotoCard = ({ heading, subheading }: PhotoCardProps) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode w-full h-auto rounded-2xl p-6">
        <CardItem
          translateZ={50}
          className="text-xl font-bold text-dark-text dark:text-text-dark mb-2 z-10"
        >
          {heading}
        </CardItem>

        <CardItem
          translateZ={60}
          className="text-sm text-primary-dark dark:text-primary-light font-medium mb-4 z-10"
        >
          {subheading}
        </CardItem>

        <CardItem translateZ={100} className="w-full h-auto z-10">
          <div className="relative w-full aspect-square overflow-hidden rounded-xl">
            <Image
              src="/about.jpeg"
              alt="Hansraj Saini - Full Stack Developer"
              fill
              className="object-cover transform group-hover/card:scale-105 transition-transform duration-500"
            />
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
  );
};

export default PhotoCard;
