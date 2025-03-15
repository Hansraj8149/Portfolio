import { TypingAnimation } from "./magicui/typing-animation";

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
    <div className="text-center py-2">
      {heading && (
        <span className="bg-gradient-to-r from-primary to-primary-dark text-transparent bg-clip-text font-bold text-sm uppercase tracking-wider">
          {heading}
        </span>
      )}
      {subheading && <TypingAnimation>{subheading}</TypingAnimation>}
      {description && (
        <p className="text-text-light max-w-2xl mx-auto">{description}</p>
      )}
      <div className="flex justify-center mt-8">
        <div className="h-1 w-24 bg-gradient-to-r from-primary-light to-secondary-dark rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionHeader;
