"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import clsx from "clsx";
import { Form, FormInput } from "@/lib/models";
import Input from "../Input";
import { motion } from "motion/react";

interface ContactFormProps {
  form: Form;
  onFormSubmit: () => void;
}

const ContactForm = ({ form, onFormSubmit }: ContactFormProps) => {
  const initialState = form.input.reduce(
    (acc: { [key: string]: string }, input: FormInput) => ({
      ...acc,
      [input.label]: "",
    }),
    {}
  );

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.target as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(() => onFormSubmit())
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        className="p-8 rounded-2xl bg-background border border-border"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-medium mb-6 text-text-secondary text-center">
          {form.title}
        </h3>

        <div className="flex flex-col gap-y-8">
          {form.input.map((field: FormInput) => (
            <Input
              key={field.label}
              type={field.type}
              placeholder={field.placeholder}
              name={field.label}
              label={field.label}
              value={formData[field.label]}
              onChange={handleChangeInput}
              onFocus={() => setFocusedField(field.label)}
              onBlur={() => setFocusedField(null)}
              isFocused={focusedField === field.label}
              required
            />
          ))}

          <motion.button
            type="submit"
            className={clsx(
              "w-full py-3.5 rounded-xl font-medium text-text mt-8",
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            )}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-text"
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
              </div>
            ) : (
              form.buttonText
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
