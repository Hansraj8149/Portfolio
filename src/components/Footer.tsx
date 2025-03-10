"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";
import FormSubmitted from "./contact/FormSubmitted";
import { ContactProps } from "@/lib/models";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-background text-text">
            {data.heading}
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </motion.div>

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
