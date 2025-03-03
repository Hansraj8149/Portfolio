"use client";
import React, { useState } from "react";
import Image from "next/image";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "@/wrapper";

const Footer = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_6nfosq9",
        "template_f5x0p0b",
        e.target as HTMLFormElement,
        "f-LA2M2svdxQ93vFA"
      )
      .then(() => setIsFormSubmitted(true))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full py-20 content-frame flex flex-col transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-text-dark">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Take a coffee & chat with me about your next project
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="flex items-center p-6 rounded-xl bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode hover:bg-secondary-lighter transition-all duration-300"
          >
            <div className="p-3 rounded-full mr-4 bg-secondary">
              <Image
                src="/images/email.png"
                alt="email"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <div>
              <h3 className="text-sm uppercase font-semibold mb-1 hover:text-primary-light  dark:text-text-dark">
                Email
              </h3>
              <a
                href="mailto:hansrajsaini8149@gmail.com"
                className="text-lg font-medium hover:text-primary-light  dark:text-text-dark"
              >
                hansrajsaini8149@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="flex items-center p-6 rounded-xl bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode hover:bg-secondary-lighter transition-all duration-300"
          >
            <div className="p-3 rounded-full mr-4 bg-secondary-light">
              <Image
                src="/images/mobile.png"
                alt="phone"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <div>
              <h3 className="text-sm uppercase font-semibold mb-1 hover:text-primary-light  dark:text-text-dark">
                Phone
              </h3>
              <a
                href="tel:+91 9398881610"
                className="text-lg font-medium hover:text-primary-light  dark:text-text-dark"
              >
                +91 9398881610
              </a>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          {!isFormSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-xl bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode hover:bg-secondary-lighter transition-all duration-300"
              onSubmit={handleSubmit}
            >
              <h3 className="text-lg font-medium hover:text-primary-light  dark:text-text-dark mb-4 ">
                Send me a message
              </h3>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium mb-2 text-text-light"
                  >
                    Your Name
                  </label>
                  <input
                    id="username"
                    className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors bg-background dark:bg-background-dark border border-border text-text-dark placeholder-text-light"
                    type="text"
                    placeholder="John Doe"
                    name="username"
                    value={formData.username}
                    onChange={handleChangeInput}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-text-light"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors bg-background dark:bg-background-dark border border-border text-text-dark placeholder-text-light"
                    type="email"
                    placeholder="john@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChangeInput}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-text-light"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors bg-background dark:bg-background-dark border border-border text-text-dark placeholder-text-light"
                    placeholder="Tell me about your project..."
                    name="message"
                    value={formData.message}
                    onChange={handleChangeInput}
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-lg font-medium transition-all transform hover:translate-y-1 ${
                    loading
                      ? "bg-secondary-dark cursor-not-allowed"
                      : "bg-primary hover:bg-primary-dark"
                  } text-text`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-text"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-10 rounded-2xl text-text"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-secondary-ligher">
                <svg
                  className="w-8 h-8 text-primary-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-text-light">
                Thank you for getting in touch!
              </h3>
              <p className="text-lg text-text-light">
                I&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setIsFormSubmitted(false)}
                className="mt-6 px-6 py-2 bg-primary hover:bg-primary-dark text-text rounded-lg transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer Credits */}
        <div className="mt-16 pt-8 border-t border-light text-text-light">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} | All rights reserved</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a
                href="#"
                className="hover:text-primary-light transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="hover:text-primary-light transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="hover:text-primary-light transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact");
