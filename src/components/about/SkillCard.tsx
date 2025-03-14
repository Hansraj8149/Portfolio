interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SkillCard = ({ icon, title, description }: SkillCardProps) => {
  return (
    <div>
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-secondary-light rounded-lg">{icon}</div>
        <div>
          <h4 className="font-semibold text-text dark:text-text-dark mb-1">
            {title}
          </h4>
          <p className="text-light-text dark:text-light-text-dark text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
