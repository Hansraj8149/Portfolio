interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SkillCard = ({ icon, title, description }: SkillCardProps) => {
  return (
    <div>
      <div className="flex items-start space-x-3 bg-background-light p-4 w-full h-full rounded">
        <div className="p-2 bg-background rounded">{icon}</div>
        <div>
          <h4 className="font-semibold text-text mb-1">{title}</h4>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
