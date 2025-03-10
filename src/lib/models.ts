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
interface Icon {
  id: number;
  url: string;
}

interface ContactDetail {
  id: number;
  name: string;
  value: string;
  icon: Icon;
}

interface FormInput {
  id: number;
  placeholder: string;
  label: string;
  type: string;
}

interface Form {
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
