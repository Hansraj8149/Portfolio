"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";
import FormSubmitted from "./contact/FormSubmitted";
import { ContactProps } from "@/lib/models";
import SectionHeader from "./SectionHeader";

const Footer = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [data, setData] = useState<ContactProps | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/contacts?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        setData(result.data[0]);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full py-20 content-frame flex flex-col">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          heading={data.heading}
          subheading={data.subheading}
          description={data.description}
        />

        <ContactInfo />

        <div className="max-w-3xl mx-auto">
          {!isFormSubmitted ? (
            <ContactForm onFormSubmit={() => setIsFormSubmitted(true)} />
          ) : (
            <FormSubmitted resetForm={() => setIsFormSubmitted(false)} />
          )}
        </div>

        <div className="py-10 text-right mt-10">
          <p>© {new Date().getFullYear()} | All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact");
