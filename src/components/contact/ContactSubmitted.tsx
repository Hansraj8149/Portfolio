import React, {useState} from "react";
import ContactForm from "./ContactForm";
import FormSubmitted from "./FormSubmitted";
import {Form} from "@/lib/models";

interface FormProps {
  form: Form;
}
const ContactSubmitted = ({form}: FormProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      {!isFormSubmitted ? (
        <ContactForm
          form={form}
          onFormSubmit={() => setIsFormSubmitted(true)}
        />
      ) : (
        <FormSubmitted resetForm={() => setIsFormSubmitted(false)} />
      )}
    </div>
  );
};

export default ContactSubmitted;
