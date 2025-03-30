"use client";
import SpotlightButton from "../SpotlightButton";
import Lottie from "lottie-react";
import successCheck from "../successCheck.json"
interface FormSubmittedProps {
  resetForm: () => void;
}

const FormSubmitted = ({resetForm}: FormSubmittedProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Lottie className="h-48 w-48" animationData={successCheck} loop={true} />

      <h3 className="text-2xl font-bold text-text">
        Thank you for getting in touch!
      </h3>
      <p className="text-lg text-text-secondary">
        I&apos;ll get back to you as soon as possible.
      </p>
      <SpotlightButton
        className="flex items-center justify-center">
        <button
          onClick={resetForm}
          className="relative z-10 flex items-center justify-center gap-2 rounded bg-background px-4 py-2 lg:px-6 lg:py-3 ring-1 ring-white/10 w-full"
        >
          Send another message
        </button>
      </SpotlightButton>
    </div>
  );
};

export default FormSubmitted;
