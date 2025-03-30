
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
    <div className="text-center lg:p-0 px-4 flex flex-col gap-2">
      {heading && (
        <h1 className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent font-bold text-sm uppercase tracking-wider">
          {heading}
        </h1>
      )}
      {subheading && <h2 className="text-2xl lg:text-3xl font-extrabold mt-3 mb-6 leading-tight">
        {subheading}
      </h2>
      }
      {description && (
        <h3 className="text-text-secondary max-w-2xl mx-auto text-sm lg:text-base">{description}</h3>
      )}
      <div className="flex justify-center mt-6">
        <div className="h-1 w-24 bg-gradient-to-r from-primary-light to-secondary-dark rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionHeader;
