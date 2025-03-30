import {cn} from "@/lib/utils";
import Image from "next/image";
import Tag from "../Tag";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  imageUrl,
  rating,
  level
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  imageUrl?: string;
  rating?: number;
  level?: string;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded bg-background border-border border p-4 transition duration-200 hover:shadow-xl",
        className,
      )}
    >
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={"Hansraj Saini - Full Stack Developer"}
            fill
            className="transition-transform duration-200 group-hover/bento:scale-105 object-cover"
          />
        </div>
      )}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="mt-2 mb-2 font-sans font-bold text-text">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-secondary">
          {description}
        </div>
      </div>
      <div className="flex justify-between items-center">
        {rating !== undefined && (
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-secondary">{rating.toFixed(1)}</span>
          </div>
        )}
        {level && (
          <Tag tag={level} />
        )}
      </div>
    </div>
  );
};
