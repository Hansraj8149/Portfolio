"use client";
import React, { useState } from "react";
import Image from "next/image";
import emailjs from "emailjs-com";
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
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-semibold text-center mt-8">
        Take a coffee & chat with me
      </h2>

      {/* Contact Cards */}
      <div className="w-full md:w-3/5 flex flex-wrap justify-center md:justify-evenly items-center my-8">
        <Image
          src="/images/email.png"
          alt="email"
          width={40}
          height={40}
          className="w-10 h-10 mr-3"
        />
        <a
          href="mailto:hansrajsaini8149@gmail.com"
          className="text-lg font-medium"
        >
          hansrajsaini8149@gmail.com
        </a>
      </div>
      <div className="flex items-center p-4 rounded-lg bg-blue-100 transition-shadow hover:shadow-lg w-72 my-2">
        <Image
          src="/images/mobile.png"
          alt="phone"
          width={40}
          height={40}
          className="w-10 h-10 mr-3"
        />
        <a href="tel:+91 9398881610" className="text-lg font-medium">
          +91 9398881610
        </a>
      </div>

      {/* Contact Form */}
      {!isFormSubmitted ? (
        <form
          className="w-full md:w-3/5 flex flex-col gap-4  shadow-md p-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Your Name"
            name="username"
            value={formData.username}
            onChange={handleChangeInput}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChangeInput}
            required
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChangeInput}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      ) : (
        <h3 className="text-xl font-semibold text-center mt-6">
          Thank you for getting in touch!
        </h3>
      )}
    </div>
  );
};

export default AppWrap(MotionWrap(Footer, "contact"), "contact", "bg-gray-100");
