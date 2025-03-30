"use client";
import dynamic from "next/dynamic";
import SpotlightButton from "../SpotlightButton";

import successCheck from "../successCheck.json";
interface FormSubmittedProps {
  resetForm: () => void;
}


const Lottie = dynamic(() => import('lottie-react'), {ssr: false});

const FormSubmitted = ({resetForm}: FormSubmittedProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Lottie className="h-36 w-36lg:h-48 lg:w-48" animationData={successCheck} loop={false} />

      <h3 className="text-xl lg:text-2xl font-bold text-text">
        Thank you for getting in touch!
      </h3>
      <p className="text-base lg:text-lg text-text-secondary">
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
