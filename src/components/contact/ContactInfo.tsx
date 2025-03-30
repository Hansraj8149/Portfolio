"use client";
import {ContactDetail} from "@/lib/models";
import Image from "next/image";
import {motion} from "motion/react";

interface ContactProps {
  contactDetails: ContactDetail[];
}

const ContactInfo = ({contactDetails}: ContactProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto py-12">
      {contactDetails.map((contact, index) => (
        <motion.div
          key={contact.id}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.4, delay: index * 0.1}}
          whileHover={{y: -4}}
          className="group flex items-center p-6 rounded bg-background 
            border border-border"
        >
          <div
            className="p-3 rounded-full mr-5 bg-accent/20 
            "
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${contact?.icon?.url}`}
                alt={contact?.icon?.alternativeText || "Hansraj Saini - Full Stack Developer "}
                width={24}
                height={24}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold mb-1.5 text-text-secondary">
              {contact?.name}
            </h3>
            <a
              href={
                contact?.name.toLowerCase() === "email"
                  ? `mailto:${contact?.value}`
                  : `tel:${contact?.value}`
              }
              className="text-base lg:text-lg font-medium text-text"
            >
              {contact?.value}
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactInfo;
