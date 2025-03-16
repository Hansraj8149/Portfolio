// Input.tsx
import React, { useState } from "react";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  required = false,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setFocused(false);
    if (onBlur) onBlur();
  };

  const isActiveField = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`absolute text-xs font-medium transition-all duration-200 pointer-events-none
          ${
            isActiveField
              ? "text-primary transform -translate-y-6 left-2"
              : "text-gray-400 left-4 top-3.5"
          }`}
      >
        {label}
        {required && " *"}
      </label>

      {label === "Message" ? (
        <textarea
          id={name}
          placeholder={isActiveField ? placeholder : ""}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={4}
          className={`w-full p-3 rounded bg-background-light border transition-all duration-200
            ${isActiveField ? "border-primary" : "border-gray-700"}
            focus:outline-none focus:ring-1 focus:ring-primary`}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={isActiveField ? placeholder : ""}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full p-3 rounded bg-background-light border transition-all duration-200
            ${isActiveField ? "border-primary" : "border-gray-700"}
            focus:outline-none focus:ring-1 focus:ring-primary`}
        />
      )}
    </div>
  );
};

export default Input;
