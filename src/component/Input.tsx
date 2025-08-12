import React from "react";
import "@/app/styles/input.css";

type InputProps = {
  type: string;
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input = ({ type, value, onChange, placeholder }: InputProps) => {
  return (
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="input-container"
    />
  );
};

export default Input;
