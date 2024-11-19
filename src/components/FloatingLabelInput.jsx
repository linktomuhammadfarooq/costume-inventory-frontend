import React, { useState } from "react";

const FloatingLabelInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete="name"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full p-2 border-2 
          ${isFocused || value ? "border-blue-500" : "border-gray-300"}
          rounded-lg outline-none transition duration-200
        `}
      />
      <label
        className={`
          absolute left-4 pointer-events-none transition-all
          ${
            isFocused || value
              ? "-top-2 text-xs text-blue-500 bg-white px-1"
              : "top-2.5 text-gray-500"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
