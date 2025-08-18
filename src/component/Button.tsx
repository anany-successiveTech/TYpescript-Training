import React from "react";
import "@/app/styles/navBar.css";

type ButtonProps = {
  name: string;
  value: string;
  active: string;
  onclick: (value: string) => void;
};

const Button = ({ name, value, onclick, active }: ButtonProps) => {
  return (
    <div className="btn-container">
      <button
        onClick={() => onclick(value)}
        className={`btn ${active ? "active" : ""}`}
      >
        {name}
      </button>
    </div>
  );
};
export default Button;
