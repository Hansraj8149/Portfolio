"use client";
import {useState} from "react";
import emailjs from "emailjs-com";
import clsx from "clsx";
import {Form, FormInput} from "@/lib/models";
import Input from "../Input";
import {motion} from "motion/react";
import {MagicCard} from "./magic-card";
import SpotlightButton from "../SpotlightButton";
import {BiMailSend} from "react-icons/bi";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
interface ContactFormProps {
  form: Form;
  onFormSubmit: () => void;
}

const ContactForm = ({form, onFormSubmit}: ContactFormProps) => {
  const initialState = form.input.reduce(
    (acc: {[key: string]: string}, input: FormInput) => ({
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
    setFormData({...formData, [e.target.name]: e.target.value});
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
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
    >
      <MagicCard gradientColor={"#262626"}>
        <form
          className="p-8 "
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-medium mb-6 text-center">
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
            <SpotlightButton
              variant="primary"
              className="flex items-center justify-center">


              <button
                type="submit"
                className={clsx("relative z-10 flex items-center justify-center gap-2 rounded bg-background px-4 py-2 lg:px-6 lg:py-3 ring-1 ring-primary/20 w-full")}
                disabled={loading}
              >
                {loading ?
                  <AiOutlineLoading3Quarters className="text-primary animate-spin" /> :
                  <BiMailSend className="text-primary" />}
                <span className="text-primary lg:text-sm text-xs">
                  {loading ? "Sending..." : form.buttonText}
                </span>
              </button>
            </SpotlightButton>
          </div>
        </form>
      </MagicCard>
    </motion.div>
  );
};

export default ContactForm;
