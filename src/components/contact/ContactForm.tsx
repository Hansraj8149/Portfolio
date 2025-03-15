"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import clsx from "clsx";
import { Form, FormInput } from "@/lib/models";

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
    <form
      className="p-6 rounded-xl bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode hover:bg-secondary-lighter"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-medium mb-4 dark:text-text-dark">
        {form.title}
      </h3>

      <div className="space-y-6">
        {form.input.map((field: FormInput) => (
          <input
            key={field.label}
            className="w-full p-3 rounded-lg bg-background dark:bg-background-dark border border-border"
            type={field.type}
            placeholder={field.placeholder}
            name={field.label}
            value={formData[field.label]}
            onChange={handleChangeInput}
            required
          />
        ))}

        <button
          type="submit"
          className={clsx(
            "w-full py-3 rounded-lg font-medium text-secondary-lighter",
            loading ? "bg-secondary-dark cursor-not-allowed" : "bg-primary"
          )}
          disabled={loading}
        >
          {loading ? "Sending..." : form.buttonText}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
