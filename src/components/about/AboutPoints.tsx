import {Paragraph} from "@/lib/models";

interface AboutPointsProps {
  icon: React.ReactNode;
  title: string;
  description: Paragraph[];
}

const AboutPoints = ({icon, title, description}: AboutPointsProps) => {
  return (
    <div>
      <div className="flex items-start space-x-3 bg-background-light p-4 w-full h-full rounded border border-border">
        <div className="p-2 bg-background rounded">{icon}</div>
        <div>
          <h4 className="font-semibold text-text mb-1">{title}</h4>
          {description && (
            <ul className="mt-5 space-y-3 text-light-text-dark text-sm" >
              {description?.map((desc, i) => (
                <li key={i} className="flex items-start gap-2.5" >

                  <span className="leading-relaxed">
                    {desc.children.map((child, idx) =>
                      // child.bold ? <strong key={idx} className="text-primary-light font-medium">{child.text}</strong> : 
                      <span key={idx}>{child.text}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPoints;
