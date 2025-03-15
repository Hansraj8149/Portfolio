import { ContactDetail } from "@/lib/models";
import Image from "next/image";

interface ContactProps {
  contactDetails: ContactDetail[];
}

const ContactInfo = ({ contactDetails }: ContactProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
      {contactDetails.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center p-6 rounded-xl bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode hover:bg-secondary-lighter"
        >
          <div className="p-3 rounded-full mr-4 bg-secondary">
            <Image
              src={contact.icon.url}
              alt={contact.name}
              width={32}
              height={32}
            />
          </div>
          <div>
            <h3 className="text-sm uppercase font-semibold mb-1 hover:text-primary-light dark:text-text-dark">
              {contact.name}
            </h3>
            <a
              href={
                contact.name.toLowerCase() === "email"
                  ? `mailto:${contact.value}`
                  : `tel:${contact.value}`
              }
              className="text-lg font-medium hover:text-primary-light dark:text-text-dark"
            >
              {contact.value}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
