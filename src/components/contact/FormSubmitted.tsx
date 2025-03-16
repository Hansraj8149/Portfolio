interface FormSubmittedProps {
  resetForm: () => void;
}

const FormSubmitted = ({ resetForm }: FormSubmittedProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-background-light">
        <svg
          className="w-8 h-8 text-primary-light"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-text">
        Thank you for getting in touch!
      </h3>
      <p className="text-lg text-text-secondary">
        I&apos;ll get back to you as soon as possible.
      </p>
      <button
        onClick={resetForm}
        className="w-56 bg-primary text-text-dark px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary-darker"
      >
        Send another message
      </button>
    </div>
  );
};

export default FormSubmitted;
