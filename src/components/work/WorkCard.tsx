import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import Image from "next/image";
import { WorkType } from "@/lib/models";

interface WorkCardProps {
  work: WorkType;
}

const WorkCard = ({ work }: WorkCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!work?.image || work.image.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === work.image.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [work?.image]);

  return (
    <div className="bg-background p-4 rounded-lg border border-primary/40  w-full">
      {work?.image?.length > 0 && (
        <div className="rounded-lg overflow-hidden relative h-48 w-full">
          <Image
            width={300}
            height={200}
            className="object-cover w-full h-full"
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${work.image[currentImageIndex].url}`}
            alt={work?.title || "Project Image"}
          />
        </div>
      )}

      <div className="p-3">
        <h4 className="text-primary text-lg font-semibold mb-1 line-clamp-1">
          {work?.title}
        </h4>
        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {work?.description[0]?.children[0]?.text}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {work?.workTags?.map((workTag) => (
            <span
              key={workTag.id}
              className="bg-background-lighter text-text text-xs px-3 py-1 rounded-full"
            >
              {workTag.tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between">
          {work?.liveLink && (
            <a
              href={work.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary-light hover:text-primary transition"
            >
              <AiFillEye size={18} />
              <span className="text-sm">Live</span>
            </a>
          )}
          {work?.githubLink && (
            <a
              href={work.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary-light hover:text-primary transition"
            >
              <AiFillGithub size={18} />
              <span className="text-sm">Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
