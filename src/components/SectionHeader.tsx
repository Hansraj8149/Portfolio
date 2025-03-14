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
    <div className="text-center max-w-4xl mx-auto mb-16">
      {heading && (
        <span className="bg-gradient-to-r from-primary to-primary-dark text-transparent bg-clip-text font-bold text-sm uppercase tracking-wider">
          {heading}
        </span>
      )}
      {subheading && (
        <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-6 leading-tight">
          {subheading}
        </h2>
      )}
      {description && (
        <p className="text-text-light dark:text-light-text-dark max-w-2xl mx-auto">
          {description}
        </p>
      )}
      <div className="flex justify-center mt-8">
        <div className="h-1 w-20 bg-gradient-to-r from-primary-light to-secondary-dark rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionHeader;
