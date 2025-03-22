import React, {useState, useEffect, useRef} from "react";
import {AiFillEye, AiFillGithub} from "react-icons/ai";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {WorkType} from "@/lib/models";

interface WorkCardProps {
  work: WorkType;
  delay?: number;
}

const WorkCard = ({work, delay = 0}: WorkCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  // For the 3D tilt effect
  const [tiltPosition, setTiltPosition] = useState({x: 0, y: 0});

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;

    setTiltPosition({x: tiltX, y: tiltY});
  };

  const resetTilt = () => {
    setTiltPosition({x: 0, y: 0});
  };

  const cardVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay * 0.2,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    initial: {scale: 1},
    hover: {scale: 1.08, transition: {duration: 0.8}}
  };

  const tagVariants = {
    hidden: {opacity: 0, y: 10},
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3
      }
    })
  };

  const buttonVariants = {
    rest: {scale: 1},
    hover: {scale: 1.05},
    tap: {scale: 0.95}
  };

  return (
    <motion.div
      onClick={() => window.open(work.liveLink, "_blank")}
      className="rounded-lg overflow-hidden bg-background 
                border border-border shadow-sm hover:shadow-md
                transition-all duration-500 flex flex-col group"
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: "-100px"}}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetTilt();
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateX(${tiltPosition.x}deg) rotateY(${tiltPosition.y}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {work?.image?.length > 0 && (
        <div className="overflow-hidden relative h-56 w-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              className="w-full h-full"
              variants={imageVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
            >
              <Image
                width={500}
                height={300}
                className="object-cover w-full h-full transition-transform duration-700"
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${work.image[currentImageIndex].url}`}
                alt={work?.title || "Project Image"}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                initial={{opacity: 0.6}}
                animate={{opacity: isHovered ? 0.8 : 0.6}}
                transition={{duration: 0.5}}
              />
            </motion.div>
          </AnimatePresence>

          {work.image.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {work.image.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === index
                    ? "bg-primary w-4"
                    : "bg-white/70 w-1.5 hover:bg-white"
                    }`}
                  whileHover={{scale: 1.2}}
                  whileTap={{scale: 0.9}}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}


        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <motion.h4
          className="text-text text-xl font-semibold mb-2 line-clamp-1"
          initial={{y: 10, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: 0.1, duration: 0.4}}
        >
          {work?.title}
        </motion.h4>

        <motion.p
          className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed"
          initial={{y: 10, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: 0.2, duration: 0.4}}
        >
          {work?.description[0]?.children[0]?.text}
        </motion.p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {work?.skillTags?.map((skillTag, index) => (
            <motion.span
              key={skillTag.id}
              custom={index}
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              className="bg-background-lighter text-text text-xs px-3 py-1 rounded-full border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300"
            >
              {skillTag.tag}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="flex justify-between mt-auto pt-3 border-t border-primary/10"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.3, duration: 0.4}}
        >
          {work?.liveLink && (
            <motion.a
              href={work.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors duration-300 group/link"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span
                className="bg-primary/10 p-1.5 rounded-full group-hover/link:bg-primary/20 transition-colors duration-300"
                whileHover={{rotate: [0, -10, 10, -10, 0]}}
                transition={{duration: 0.5}}
              >
                <AiFillEye size={16} />
              </motion.span>
              <span className="text-sm font-medium">Live Demo</span>
            </motion.a>
          )}

          {work?.githubLink && (
            <motion.a
              href={work.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors duration-300 group/link"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span
                className="bg-primary/10 p-1.5 rounded-full group-hover/link:bg-primary/20 transition-colors duration-300"
                whileHover={{rotate: 360}}
                transition={{duration: 0.5}}
              >
                <AiFillGithub size={16} />
              </motion.span>
              <span className="text-sm font-medium">View Code</span>
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkCard;