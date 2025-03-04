"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";
import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";
import FormSubmitted from "./contact/FormSubmitted";

const Footer = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Take a coffee & chat with me about your next project
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
