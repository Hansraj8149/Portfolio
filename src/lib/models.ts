interface TextNode {
  text: string;
  type: string;
}

interface Paragraph {
  type: string;
  children: TextNode[];
}

interface Expertise {
  id: number;
  title: string;
  description: Paragraph[];
  level: string;
  rating: number;
}

export interface ExpertiseProps {
  id: number;
  heading: string;
  description: Paragraph[];
  subheading: string;
  expertises: Expertise[];
}
