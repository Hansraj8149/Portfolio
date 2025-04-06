interface TextNode {
  bold?: boolean;
  text: string;
  type: string;
}

export interface Paragraph {
  type: string;
  children: TextNode[];
}
export interface SkillTagsProps {
  id: number;
  tag: string;
}
export interface ImageProps {
  url: string;
  name: string;
  alternativeText: string;
}
export interface NavbarProps {
  id: number;
  primaryButtonText: string;
  primaryButtonLink: string;
  navbarLinks: {
    id: number;
    name: string;
    link: string;
  }[];
}

export interface SeoResponse {
  title: string;
  description: string;
  url: string;
  image: ImageProps;
}

export interface HeroProps {
  id: number;
  title: string;
  heading: string;
  subheading: string;
  description: string;
  links: {
    name: string;
    link: string;
  }[];
}
export interface AboutProps {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  aboutPoints: {
    id: number;
    title: string;
    description: Paragraph[];
  }[];
  photoCard: {
    heading: string;
    subheading: string;
    image: ImageProps;
    skillTags: {
      id: number;
      tag: string;
    }[];
  };
}

export interface WorkType {
  id: number;
  title: string;
  description: Paragraph[];
  liveLink?: string;
  githubLink?: string;
  workTags: {
    id: number;
    tag: string;
  }[];
  skillTags: SkillTagsProps[];
  image: ImageProps[];
}

export interface WorksProps {
  heading: string;
  subHeading: string;
  description: string;
  works: WorkType[];
  filters: {
    id: string;
    skillTags: SkillTagsProps[];
  };
}
export interface Expertise {
  id: number;
  title: string;
  description: Paragraph[];
  image: ImageProps[];
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

export interface SkillsType {
  id: number;
  tag: string;
  skill: string;
}

export interface SkillsProps {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  skills: SkillsType[];
}
export interface Experience {
  id: number;
  role: string;
  company: string;
  description?: Paragraph[];
  fromDate: string;
  toDate: string;
  location: string;
  images: ImageProps[];
  technologies?: string[];
}

export interface ExperienceProps {
  heading: string;
  subheading: string;
  description: Paragraph[];
  experiences: Experience[];
}
export interface ContactDetail {
  id: number;
  name: string;
  value: string;
  icon: ImageProps;
}

export interface FormInput {
  id: number;
  placeholder: string;
  label: string;
  type: string;
}

export interface Form {
  id: number;
  title: string;
  buttonText: string;
  input: FormInput[];
}

export interface ContactProps {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  contactDetails: ContactDetail[];
  form: Form;
}
