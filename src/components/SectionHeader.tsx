import {TypingAnimation} from "./typing-animation";

interface SectionHeaderProps {
  heading?: string;
  subheading?: string;
  description?: string;
}

const SectionHeader = ({
  heading,
  subheading,
  description,
}: SectionHeaderProps) => {
  return (
    <div className="text-center p-2">
      {heading && (
        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent font-bold text-sm uppercase tracking-wider">
          {heading}
        </span>
      )}
      {subheading && <TypingAnimation>{subheading}</TypingAnimation>}
      {description && (
        <p className="text-text-light max-w-2xl mx-auto">{description}</p>
      )}
      <div className="flex justify-center py-8">
        <div className="h-1 w-24 bg-gradient-to-r from-primary-light to-secondary-dark rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionHeader;
