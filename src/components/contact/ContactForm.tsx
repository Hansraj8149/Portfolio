import { useState } from "react";
import emailjs from "emailjs-com";
import clsx from "clsx";

interface ContactFormProps {
  onFormSubmit: () => void;
}

const ContactForm = ({ onFormSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
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
        Send me a message
      </h3>

      <div className="space-y-6">
        <input
          className="w-full p-3 rounded-lg bg-background dark:bg-background-dark border border-border"
          type="text"
          placeholder="Your Name"
          name="username"
          value={formData.username}
          onChange={handleChangeInput}
          required
        />

        <input
          className="w-full p-3 rounded-lg bg-background dark:bg-background-dark border border-border"
          type="email"
          placeholder="Your Email"
          name="email"
          value={formData.email}
          onChange={handleChangeInput}
          required
        />

        <textarea
          className="w-full p-3 rounded-lg bg-background dark:bg-background-dark border border-border"
          placeholder="Your Message"
          name="message"
          value={formData.message}
          onChange={handleChangeInput}
          rows={5}
          required
        />

        <button
          type="submit"
          className={clsx(
            "w-full py-3 rounded-lg font-medium text-secondary-lighter",
            loading ? "bg-secondary-dark cursor-not-allowed" : "bg-primary"
          )}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
