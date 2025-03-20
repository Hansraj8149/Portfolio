import React, {useState, useEffect} from "react";
import {AiFillEye, AiFillGithub} from "react-icons/ai";
import Image from "next/image";
import {motion} from "motion/react";
import {WorkType} from "@/lib/models";

interface WorkCardProps {
  work: WorkType;
}

const WorkCard = ({work}: WorkCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!work?.image || work.image.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === work.image.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [work?.image, isHovered]);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-background 
            border border-gray-800 shadow-sm hover:shadow-md
            transition-all duration-300 flex flex-col"
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.4}}
      viewport={{once: true, margin: "-50px"}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {work?.image?.length > 0 && (
        <div className="overflow-hidden relative h-52 w-full">
          <motion.div
            className="w-full h-full"
            initial={false}
            animate={{
              scale: isHovered ? 1.05 : 1,
              transition: {duration: 0.5}
            }}
          >
            <Image
              width={500}
              height={300}
              className="object-cover w-full h-full"
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${work.image[currentImageIndex].url}`}
              alt={work?.title || "Project Image"}
            />
          </motion.div>

          {work.image.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {work.image.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === index
                    ? "bg-primary w-3"
                    : "bg-white/60 hover:bg-white/80"
                    }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        <h4 className="text-primary text-lg font-medium mb-2 line-clamp-1">
          {work?.title}
        </h4>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
          {work?.description[0]?.children[0]?.text}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {work?.skillTags?.map((skillTag, index) => (
            <motion.span
              key={skillTag.id}
              initial={{opacity: 0, scale: 0.8}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: index * 0.05, duration: 0.2}}
              className="bg-background-lighter text-text text-xs px-2.5 py-1 rounded-full"
            >
              {skillTag.tag}
            </motion.span>
          ))}
        </div>

        <div className="flex justify-between pt-2 border-t border-primary/5">
          {work?.liveLink && (
            <motion.a
              href={work.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-primary-light hover:text-primary transition-colors duration-200"
              whileHover={{x: 2}}
              whileTap={{scale: 0.98}}
            >
              <AiFillEye size={16} />
              <span className="text-sm font-medium">Live Demo</span>
            </motion.a>
          )}
          {work?.githubLink && (
            <motion.a
              href={work.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-primary-light hover:text-primary transition-colors duration-200"
              whileHover={{x: 2}}
              whileTap={{scale: 0.98}}
            >
              <AiFillGithub size={16} />
              <span className="text-sm font-medium">View Code</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;