import { useForm } from "@tanstack/react-form";

import { z } from "zod";
import emailjs from "emailjs-com";
import clsx from "clsx";

interface ContactFormProps {
  onFormSubmit: () => void;
}
interface FormType {
  name: string;
  email: string;
  message: string;
}
const ContactForm = ({ onFormSubmit }: ContactFormProps) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    } as FormType,
    onSubmit: async ({
      value,
    }: {
      value: { name: string; email: string; message: string };
    }) => {
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          value,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
        );
        onFormSubmit();
      } catch (error) {
        console.error("Email send error", error);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        const data = new FormData(e.target as HTMLFormElement);
        data.forEach((value, name) => {
          if (form.getFieldValue(name as keyof FormType) == "") {
            form.setFieldValue(name as keyof FormType, value as string);
          }
        });
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="p-6 rounded-xl bg-secondary-lighter dark:bg-background-light-dark border border-border dark:border-border-dark-mode hover:bg-secondary-lighter"
    >
      <h3 className="text-lg font-medium mb-4 dark:text-text-dark">
        Send me a message
      </h3>
      <div className="space-y-6">
        <form.Field
          name="name"
          validators={{
            onBlur: z.string().min(3, "Name must be at least 3 characters"),
          }}
        >
          {(field) => (
            <input
              className={clsx(
                "w-full p-3 rounded-lg bg-background dark:bg-background-dark border border-border",
                field.state.meta.isTouched &&
                  field.state.meta.errors.length &&
                  "border-red-500"
              )}
              type="text"
              placeholder="Your Name"
            />
          )}
        </form.Field>
        <form.Field
          name="email"
          validators={{ onBlur: z.string().email("Invalid email address") }}
        >
          {(field) => (
            <input
              className={clsx(
                "w-full p-3 rounded-lg bg-background dark:bg-background-dark border border-border",
                field.state.meta.isTouched &&
                  field.state.meta.errors.length &&
                  "border-red-500"
              )}
              type="email"
              placeholder="Your Email"
            />
          )}
        </form.Field>

        <form.Field
          name="message"
          validators={{
            onBlur: z
              .string()
              .min(10, "Message must be at least 10 characters"),
          }}
        >
          {(field) => (
            <textarea
              className={clsx(
                "w-full p-3 rounded-lg bg-background dark:bg-background-dark border border-border",
                field.state.meta.isTouched &&
                  field.state.meta.errors.length &&
                  "border-red-500"
              )}
              placeholder="Your Message"
              rows={5}
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(state: { isSubmitting: boolean }) => [state.isSubmitting]}
        >
          {([isSubmitting]) => {
            return (
              <button
                type="submit"
                className={clsx(
                  "w-full py-3 rounded-lg font-medium text-secondary-lighter",
                  isSubmitting
                    ? "bg-secondary-dark cursor-not-allowed"
                    : "bg-primary"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            );
          }}
        </form.Subscribe>
      </div>
    </form>
  );
};

export default ContactForm;
