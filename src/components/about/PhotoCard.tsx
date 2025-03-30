import React from "react";
import Image from "next/image";
import {CardBody, CardContainer, CardItem} from "@/components/about/3d-card";
import {ImageProps, SkillTagsProps} from "@/lib/models";
import Tag from "../Tag";

interface PhotoCardProps {
  heading: string;
  subheading: string;
  image: ImageProps;
  skillTags: SkillTagsProps[];
}

const PhotoCard = ({
  heading,
  subheading,
  image,
  skillTags,
}: PhotoCardProps) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card bg-background-lighter border border-border  w-5/6 lg:w-full h-full rounded p-6">
        <CardItem
          translateZ={50}
          className="text-xl font-bold text-text mb-2 z-10"
        >
          {heading}
        </CardItem>

        <CardItem
          translateZ={60}
          className="text-sm text-primary-dark  font-medium mb-4 z-10"
        >
          {subheading}
        </CardItem>

        <CardItem translateZ={100} className="w-full h-auto z-10">
          <div className="relative w-full aspect-square overflow-hidden rounded-xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${image.url}`}
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
          <div className="flex gap-2 items-center flex-wrap">
            {skillTags.map((skillTag, index) => (
              <Tag
                key={index}
                tag={skillTag.tag}
              />
            ))}
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default PhotoCard;
